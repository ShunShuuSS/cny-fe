"use client";

import { useEffect, use, useCallback, useMemo, useState } from "react";
import { useInvitation } from "@/lib/hooks/useInvitation";
import { useAudioPlayer } from "@/lib/hooks/useAudioPlayer";
import GateScreen from "@/components/invitation/GateScreen";
import GreetingScreen from "@/components/invitation/GreetingScreen";
import ZodiacSelection from "@/components/invitation/ZodiacSelection";
import LuckTestGame from "@/components/invitation/LuckTestGame";
import FortuneResult from "@/components/invitation/FortuneResult";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import PublicLayout from "@/components/layout/PublicLayout";
import * as api from "@/lib/api";

export default function InvitationPage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = use(params);
  const invitation = useInvitation(slug, parseInt(year));
  const [zodiacData, setZodiacData] = useState<
    Record<string, { image: string; name: string; name_en: string }>
  >({});
  const [zodiacLoading, setZodiacLoading] = useState(true);

  const musicTracks = useMemo(
    () => [
      {
        src: "/music/新年好马 (feat. 娃娃, 钟旭辉, 孙琪欢, 郑雪钧, 冯韦诚, 李永钧).mp3",
        name: "新年好马",
      },
      { src: "/music/福气马上来.mp3", name: "福气马上来" },
      { src: "/music/Omg新年到.mp3", name: "Omg新年到" },
    ],
    [],
  );

  const audioPlayer = useAudioPlayer(musicTracks);

  useEffect(() => {
    invitation.loadInvitation();
  }, [slug]);

  useEffect(() => {
    const fetchZodiacs = async () => {
      try {
        const response = await api.getZodiacs();
        if (response.success && response.data) {
          const zodiacMap: Record<
            string,
            { image: string; name: string; name_en: string }
          > = {};
          response.data.forEach((zodiac) => {
            zodiacMap[zodiac.name_en.toLowerCase()] = {
              image: zodiac.image,
              name: zodiac.name,
              name_en: zodiac.name_en,
            };
          });
          setZodiacData(zodiacMap);
        }
      } catch (error) {
        console.error("Failed to fetch zodiacs:", error);
      } finally {
        setZodiacLoading(false);
      }
    };

    fetchZodiacs();
  }, []);

  const handleGateClickWithMusic = useCallback(async () => {
    console.log("Gate clicked - attempting to start music");
    console.log("Audio player state:", {
      isPlaying: audioPlayer.isPlaying,
      currentTrack: audioPlayer.currentTrack,
      tracks: musicTracks,
    });

    // Mark that user has interacted with the site
    try {
      localStorage.setItem("cny_user_interacted", "true");
    } catch (e) {
      console.warn("Failed to store interaction flag:", e);
    }

    // Open the gate first
    invitation.openGate();

    // Start music after a brief delay to ensure smooth transition
    setTimeout(async () => {
      try {
        if (!audioPlayer.isPlaying) {
          console.log("Attempting to play music...");
          await audioPlayer.play();
          console.log("Music started successfully on gate click");
        } else {
          console.log("Music is already playing");
        }
      } catch (error) {
        console.error("Failed to start music on gate click:", error);
        // Retry once after a delay
        setTimeout(async () => {
          try {
            await audioPlayer.play();
            console.log("Music started on retry");
          } catch (retryError) {
            console.error("Music retry failed:", retryError);
          }
        }, 500);
      }
    }, 100);
  }, [audioPlayer, invitation, musicTracks]);

  const handleContinue = useCallback(() => {
    invitation.startSession();
  }, [invitation]);

  const handlePlayTrack = useCallback(
    async (index: number) => {
      // Mark user interaction
      try {
        localStorage.setItem("cny_user_interacted", "true");
      } catch (e) {
        console.warn("Failed to store interaction flag:", e);
      }

      // Directly set the track index
      audioPlayer.setTrack(index);

      // Auto-play the selected track
      try {
        await audioPlayer.play();
        console.log("Started playing selected track:", index);
      } catch (error) {
        console.error("Failed to play selected track:", error);
      }
    },
    [audioPlayer],
  );

  const handleTogglePlay = useCallback(() => {
    if (audioPlayer.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }, [audioPlayer]);

  if ((invitation.loading && !invitation.invitationData) || zodiacLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cny-red via-cny-crimson to-cny-red-dark">
        <div className="text-2xl text-white font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (invitation.error && !invitation.invitationData) {
    return (
      <PublicLayout>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cny-red via-cny-crimson to-cny-red-dark p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Invitation Not Found
            </h1>
            <p className="text-gray-600">{invitation.error}</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cny-red via-cny-crimson to-cny-red-dark relative overflow-hidden">
      <PublicLayout>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cny-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-cny-gold-light rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-cny-gold rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 pb-24">
          {(invitation.step === "GATE_CLOSED" ||
            invitation.step === "GATE_OPENING") && (
            <GateScreen
              onGateClick={handleGateClickWithMusic}
              isOpening={invitation.step === "GATE_OPENING"}
            />
          )}

          {invitation.step === "GREETING" && (
            <GreetingScreen
              onContinue={handleContinue}
              loading={invitation.loading}
            />
          )}

          {invitation.step === "ZODIAC_SELECTION" && (
            <ZodiacSelection
              selectedZodiac={invitation.selectedZodiac}
              onSelect={invitation.selectZodiac}
              onConfirm={invitation.startLuckGame}
              zodiacData={zodiacData}
              year={parseInt(year)}
            />
          )}

          {invitation.step === "LUCK_GAME" && (
            <LuckTestGame
              onComplete={invitation.saveLuckGame}
              onProceed={invitation.confirmZodiac}
              loading={invitation.loading}
              score={invitation.luckScore}
            />
          )}

          {invitation.step === "RESULT" &&
            invitation.result &&
            invitation.selectedZodiac && (
              <FortuneResult
                fortune={invitation.result}
                zodiac={invitation.selectedZodiac as any}
                zodiacData={zodiacData}
                rewardLink={invitation.invitationData?.reward_code || undefined}
              />
            )}
        </div>
      </PublicLayout>

      {/* Music Player - Shows after gate is clicked */}
      {invitation.step !== "GATE_CLOSED" &&
        invitation.step !== "GATE_OPENING" && (
          <MusicPlayer
            tracks={musicTracks}
            currentTrackIndex={audioPlayer.currentTrackIndex}
            isPlaying={audioPlayer.isPlaying}
            currentTime={audioPlayer.currentTime}
            duration={audioPlayer.duration}
            onNext={audioPlayer.next}
            onPrevious={audioPlayer.previous}
            onPlayTrack={handlePlayTrack}
            onTogglePlay={handleTogglePlay}
          />
        )}
    </div>
  );
}
