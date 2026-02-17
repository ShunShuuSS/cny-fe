import { useState, useEffect } from "react";
import * as api from "../api";

type InvitationStep =
  | "GATE_CLOSED"
  | "GATE_OPENING"
  | "GREETING"
  | "ZODIAC_SELECTION"
  | "LUCK_GAME"
  | "RESULT";

type ZodiacSign =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

interface ForecastData {
  text: string;
  rating: number;
}

interface FortuneResult {
  career: ForecastData;
  wealth: ForecastData;
  health: ForecastData;
  romance: ForecastData;
}

interface InvitationState {
  step: InvitationStep;
  sessionId: string | null;
  selectedZodiac: ZodiacSign | null;
  result: FortuneResult | null;
  luckScore: number | null;
  loading: boolean;
  error: string | null;
  invitationData: {
    id: string;
    name: string;
    slug: string;
    is_active: number;
    reward_code?: string | null;
  } | null;
}

export function useInvitation(slug: string, year: number) {
  const [state, setState] = useState<InvitationState>({
    step: "GATE_CLOSED",
    sessionId: null,
    selectedZodiac: null,
    result: null,
    luckScore: null,
    loading: false,
    error: null,
    invitationData: null,
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(`invitation_${slug}`);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setState((prev) => ({
          ...prev,
          sessionId: data.sessionId,
          step: data.step || "GATE_CLOSED",
          result: data.result || null,
          selectedZodiac: data.selectedZodiac || null,
        }));
      } catch (e) {
        sessionStorage.removeItem(`invitation_${slug}`);
      }
    }
  }, [slug]);

  const loadInvitation = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.get<{
        success: boolean;
        data: {
          id: string;
          name: string;
          slug: string;
          is_active: number;
          reward_code?: string | null;
        };
      }>(`/api/public/invitation/${year}/${slug}`);
      setState((prev) => ({
        ...prev,
        invitationData: response.data,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to load invitation",
        loading: false,
      }));
    }
  };

  const openGate = () => {
    setState((prev) => ({ ...prev, step: "GATE_OPENING" }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, step: "GREETING" }));
    }, 1500);
  };

  const startSession = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.post<{
        success: boolean;
        data: { session_id: string };
      }>(`/api/public/invitation/${year}/${slug}/start`);
      const newState = {
        sessionId: response.data.session_id,
        step: "ZODIAC_SELECTION" as InvitationStep,
        selectedZodiac: null,
        result: null,
      };
      sessionStorage.setItem(`invitation_${slug}`, JSON.stringify(newState));
      setState((prev) => ({
        ...prev,
        ...newState,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to start session",
        loading: false,
      }));
    }
  };

  const selectZodiac = (zodiac: ZodiacSign | null) => {
    setState((prev) => ({ ...prev, selectedZodiac: zodiac }));
  };

  const startLuckGame = () => {
    setState((prev) => ({ ...prev, step: "LUCK_GAME" }));
  };

  const saveLuckGame = async (score: number) => {
    if (!state.sessionId) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await api.post(`/api/public/invitation/${year}/${slug}/luck-game`, {
        session_id: state.sessionId,
        score,
        game_type: "fortune_wheel",
      });
      setState((prev) => ({
        ...prev,
        luckScore: score,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to save luck game",
        loading: false,
      }));
    }
  };

  const confirmZodiac = async () => {
    if (!state.sessionId || !state.selectedZodiac) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.post<{
        success: boolean;
        data: { result: FortuneResult; zodiac: string };
      }>(`/api/public/invitation/${year}/${slug}/draw`, {
        session_id: state.sessionId,
        zodiac: state.selectedZodiac,
      });
      const newState = {
        sessionId: state.sessionId,
        selectedZodiac: state.selectedZodiac,
        step: "RESULT" as InvitationStep,
        result: response.data.result,
      };
      sessionStorage.setItem(`invitation_${slug}`, JSON.stringify(newState));
      setState((prev) => ({
        ...prev,
        step: "RESULT",
        result: response.data.result,
        loading: false,
      }));
    } catch (error) {
      if (error instanceof Error && error.message.includes("409")) {
        setState((prev) => ({
          ...prev,
          error: "Fortune already revealed",
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to reveal fortune",
          loading: false,
        }));
      }
    }
  };

  return {
    ...state,
    loadInvitation,
    openGate,
    startSession,
    selectZodiac,
    startLuckGame,
    saveLuckGame,
    confirmZodiac,
  };
}
