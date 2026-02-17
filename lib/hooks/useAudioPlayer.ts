"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Track {
  src: string;
  name: string;
}

interface AudioPlayerState {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
}

export function useAudioPlayer(tracks: Track[], autoPlay = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldContinuePlaying = useRef(false);
  const isFirstMount = useRef(true);
  const currentTrackIndexRef = useRef(0); // Track current index without closure issues
  const STORAGE_KEY = "cny_audio_state";

  const loadInitialState = () => {
    if (typeof window === "undefined")
      return {
        currentTrackIndex: 0,
        isPlaying: false,
        currentTime: 0,
        hasSavedState: false,
      };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const hasUserInteracted =
        localStorage.getItem("cny_user_interacted") === "true";

      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore isPlaying state if user has interacted with site before
        // This allows autoplay on refresh while respecting browser policies
        return {
          ...parsed,
          isPlaying: hasUserInteracted ? parsed.isPlaying : false,
          hasSavedState: true,
        };
      }
      return {
        currentTrackIndex: 0,
        isPlaying: false,
        currentTime: 0,
        hasSavedState: false,
      };
    } catch (error) {
      console.error("Failed to load audio state:", error);
      return {
        currentTrackIndex: 0,
        isPlaying: false,
        currentTime: 0,
        hasSavedState: false,
      };
    }
  };

  const initialState = loadInitialState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    () => initialState.currentTrackIndex,
  );
  const [isPlaying, setIsPlaying] = useState(() => initialState.isPlaying);
  const [currentTime, setCurrentTime] = useState(
    () => initialState.currentTime,
  );
  const [duration, setDuration] = useState(0);
  const hasSavedState = useRef(initialState.hasSavedState);

  const saveState = useCallback(
    (state: AudioPlayerState) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save audio state:", error);
      }
    },
    [STORAGE_KEY],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.volume = 0.7; // Set default volume
    audio.preload = "auto";
    audioRef.current = audio;

    console.log("Audio element created");

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      saveState({
        currentTrackIndex: currentTrackIndexRef.current, // Use ref to avoid stale closure
        isPlaying: !audio.paused,
        currentTime: audio.currentTime,
      });
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log("Audio metadata loaded:", audio.src);
    };

    const handleEnded = () => {
      console.log("Track ended, moving to next");
      console.log("shouldContinuePlaying:", shouldContinuePlaying.current);

      // Mark that we should continue playing after track change
      shouldContinuePlaying.current = true;
      console.log("Will continue playing next track");

      setCurrentTrackIndex((prev: number) => {
        if (prev < tracks.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      console.error("Audio error details:", {
        src: audio.src,
        error: audio.error,
        networkState: audio.networkState,
        readyState: audio.readyState,
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [tracks.length, saveState]);

  useEffect(() => {
    if (!audioRef.current || tracks.length === 0) return;

    const audio = audioRef.current;
    const newSrc = tracks[currentTrackIndex].src;

    // Only reload if source actually changed - compare the path portion only
    const currentSrcPath = audio.src.split("/").pop() || "";
    const newSrcPath = newSrc.split("/").pop() || "";

    if (currentSrcPath === newSrcPath && audio.src !== "") {
      console.log(
        "Track already loaded, skipping:",
        tracks[currentTrackIndex].name,
      );
      return;
    }

    console.log("Loading track:", tracks[currentTrackIndex].name);
    audio.src = newSrc;
    audio.load();

    // Restore saved time after metadata loads
    const handleLoadedMetadata = () => {
      if (isFirstMount.current && hasSavedState.current && currentTime > 0) {
        audio.currentTime = currentTime;
        console.log("Restoring saved currentTime:", currentTime);
      }
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Auto-play logic:
    // 1. First mount: Always play if user has interacted (continuous background music)
    // 2. Track changes: Play if shouldContinuePlaying is true
    const hasUserInteracted =
      typeof window !== "undefined" &&
      localStorage.getItem("cny_user_interacted") === "true";
    const shouldPlay = isFirstMount.current
      ? hasUserInteracted
      : shouldContinuePlaying.current;

    console.log("Autoplay check:", {
      isFirstMount: isFirstMount.current,
      hasUserInteracted,
      hasSavedState: hasSavedState.current,
      initialIsPlaying: initialState.isPlaying,
      shouldContinuePlaying: shouldContinuePlaying.current,
      shouldPlay,
    });

    if (shouldPlay) {
      const playType = isFirstMount.current
        ? "on refresh (user has interacted before)"
        : "next track";
      console.log(`Attempting to auto-play ${playType}`);

      // Wait for audio to be ready before playing
      const attemptPlay = async () => {
        try {
          await audio.play();
          console.log("Auto-play successful");
          setIsPlaying(true);
          shouldContinuePlaying.current = false;
        } catch (error: any) {
          if (error.name === "NotAllowedError") {
            console.log("Auto-play blocked - user needs to click play button");
            // Don't set isPlaying to false, keep it ready for user to click
          } else {
            console.warn("Auto-play failed:", error.name, error);
            setIsPlaying(false);
            shouldContinuePlaying.current = false;
          }
        }
      };

      // If audio is already ready, play immediately
      if (audio.readyState >= 2) {
        console.log("Audio ready, playing immediately");
        attemptPlay();
      } else {
        // Otherwise wait for canplay event
        console.log("Audio not ready, waiting for canplay event");
        const onCanPlay = () => {
          console.log("Audio canplay event fired");
          audio.removeEventListener("canplay", onCanPlay);
          attemptPlay();
        };
        audio.addEventListener("canplay", onCanPlay);
      }
    }

    isFirstMount.current = false;
  }, [currentTrackIndex, tracks]);

  // Autoplay useEffect - waits for component mount and audio ready
  useEffect(() => {
    const hasUserInteracted =
      typeof window !== "undefined" &&
      localStorage.getItem("cny_user_interacted") === "true";

    if (!hasUserInteracted || !audioRef.current) return;

    const audio = audioRef.current;
    let hasStartedPlaying = false;
    let attemptCount = 0;

    // Try to play audio
    const attemptPlay = () => {
      if (!audioRef.current || hasStartedPlaying) return;

      attemptCount++;
      console.log(`🎵 Autoplay attempt #${attemptCount}...`);

      audioRef.current
        .play()
        .then(() => {
          console.log("✅ Autoplay successful!");
          setIsPlaying(true);
          hasStartedPlaying = true;
        })
        .catch(() => {
          if (attemptCount === 1) {
            console.log(
              "⚠️ Autoplay blocked, will retry or wait for user click",
            );
          }
        });
    };

    // Listen for when audio is ready to play
    const handleCanPlayThrough = () => {
      console.log("🎵 Audio ready (canplaythrough event)");
      attemptPlay();
    };

    // Click handler as fallback
    const handleFirstClick = () => {
      if (hasStartedPlaying) return;

      console.log("🎵 User clicked - starting music");

      if (audioRef.current && !audioRef.current.paused) {
        console.log("Music already playing");
        return;
      }

      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            console.log("✅ Music started on user click");
            setIsPlaying(true);
            hasStartedPlaying = true;
            document.removeEventListener("click", handleFirstClick);
          })
          .catch(() => {
            console.log("⚠️ Failed to start music");
          });
      }
    };

    // Strategy: Multiple attempts with increasing delays
    // 1. Immediate attempt if audio is ready
    if (audio.readyState >= 3) {
      // HAVE_FUTURE_DATA or better
      console.log("🎵 Audio already ready, attempting play immediately");
      attemptPlay();
    } else {
      // 2. Listen for canplaythrough event
      audio.addEventListener("canplaythrough", handleCanPlayThrough, {
        once: true,
      });
    }

    // 3. Timeout fallback (1 second after mount)
    const timer1 = setTimeout(() => {
      if (
        !hasStartedPlaying &&
        audioRef.current &&
        audioRef.current.readyState >= 2
      ) {
        console.log("🎵 Timeout attempt (1s)");
        attemptPlay();
      }
    }, 1000);

    // 4. Second timeout fallback (2 seconds after mount)
    const timer2 = setTimeout(() => {
      if (
        !hasStartedPlaying &&
        audioRef.current &&
        audioRef.current.readyState >= 2
      ) {
        console.log("🎵 Final timeout attempt (2s)");
        attemptPlay();
      }
    }, 2000);

    // 5. Click listener as last resort
    document.addEventListener("click", handleFirstClick);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.removeEventListener("click", handleFirstClick);
    };
  }, []); // Run only once on mount

  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.error("❌ Audio ref not available");
      return;
    }

    const audio = audioRef.current;
    console.log("🎵 Play requested. Current track index:", currentTrackIndex);
    console.log("📚 Available tracks:", tracks.length);
    console.log("🔊 Audio state:", {
      src: audio.src,
      readyState: audio.readyState,
      networkState: audio.networkState,
      paused: audio.paused,
      duration: audio.duration,
    });

    // Ensure audio source is set (should already be set by useEffect)
    if (!audio.src || audio.src === "") {
      console.error("❌ Audio source not set - this should not happen");
      return;
    }

    try {
      // Wait for audio to be ready if it's not already
      if (audio.readyState < 2) {
        console.log(
          "⏳ Audio not ready (readyState:",
          audio.readyState,
          "), waiting for canplay event...",
        );
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Audio load timeout after 10s"));
          }, 10000);

          const onCanPlay = () => {
            clearTimeout(timeout);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("error", onError);
            console.log("Audio ready to play (canplay event fired)");
            resolve();
          };

          const onError = () => {
            clearTimeout(timeout);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("error", onError);
            console.error("Audio error during load");
            reject(new Error("Audio load error"));
          };

          audio.addEventListener("canplay", onCanPlay);
          audio.addEventListener("error", onError);
        });
      }

      console.log("▶️ Attempting to play:", audio.src);
      await audio.play();
      setIsPlaying(true);
      shouldContinuePlaying.current = true; // Enable continuous playback
      console.log("✅ Audio playing successfully!");
      console.log("🎵 Current playback state:", {
        paused: audio.paused,
        currentTime: audio.currentTime,
        duration: audio.duration,
        volume: audio.volume,
      });
    } catch (error) {
      console.error("❌ Failed to play audio:", error);
      setIsPlaying(false);
      shouldContinuePlaying.current = false;
      throw error;
    }
  }, [currentTrackIndex, tracks]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const next = useCallback(() => {
    shouldContinuePlaying.current = true;
    setCurrentTrackIndex((prev: number) => {
      const newIndex = (prev + 1) % tracks.length;
      currentTrackIndexRef.current = newIndex; // Update ref
      // Immediately save to localStorage so it persists on refresh
      saveState({
        currentTrackIndex: newIndex,
        isPlaying: !audioRef.current?.paused || false,
        currentTime: audioRef.current?.currentTime || 0,
      });
      return newIndex;
    });
  }, [tracks.length, saveState]);

  const previous = useCallback(() => {
    shouldContinuePlaying.current = true;
    setCurrentTrackIndex((prev: number) => {
      const newIndex = (prev - 1 + tracks.length) % tracks.length;
      currentTrackIndexRef.current = newIndex; // Update ref
      // Immediately save to localStorage so it persists on refresh
      saveState({
        currentTrackIndex: newIndex,
        isPlaying: !audioRef.current?.paused || false,
        currentTime: audioRef.current?.currentTime || 0,
      });
      return newIndex;
    });
  }, [tracks.length, saveState]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const setTrack = useCallback(
    (index: number) => {
      shouldContinuePlaying.current = true;
      const validIndex = Math.max(0, Math.min(index, tracks.length - 1));
      currentTrackIndexRef.current = validIndex; // Update ref immediately
      setCurrentTrackIndex(validIndex);
      // Immediately save to localStorage
      saveState({
        currentTrackIndex: validIndex,
        isPlaying: !audioRef.current?.paused || false,
        currentTime: 0,
      });
      console.log(`Track changed to index ${validIndex}`);
    },
    [tracks.length, saveState],
  );

  return {
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
    setTrack,
    isPlaying,
    currentTime,
    duration,
    currentTrack: tracks[currentTrackIndex],
    currentTrackIndex,
  };
}
