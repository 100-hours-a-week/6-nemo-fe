// src/shared/store/chatbot-store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ChatMessage = {
  id: string;
  role: "ai" | "user";
  text: string;
  options?: string[];
  timestamp: number;
  isStreaming?: boolean; // 스트리밍 중인지 여부
};

export type ChatbotSession = {
  messages: ChatMessage[];
  isLoading: boolean;
  currentQuestion: {
    question: string;
    options: string[];
  } | null;
  recommendedGroup: {
    groupId: number;
    name: string;
    category: string;
    summary: string;
    description: string;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    imageUrl: string | null;
    tags: string[];
  } | null;
  recommendationReason: string | null;
  isRecommendationComplete: boolean;
  isSSEConnected: boolean; // SSE 연결 상태
  currentStreamingMessageId: string | null; // 현재 스트리밍 중인 메시지 ID
};

type ChatbotState = {
  session: ChatbotSession;
  isHydrated: boolean;

  // Actions
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void;
  setCurrentQuestion: (
    question: { question: string; options: string[] } | null
  ) => void;
  setLoading: (loading: boolean) => void;
  setRecommendation: (
    group: ChatbotSession["recommendedGroup"],
    reason: string
  ) => void;
  clearSession: () => void;
  setHydrated: (state: boolean) => void;
  hasMessages: () => boolean;
  setSSEConnected: (connected: boolean) => void;
  setCurrentStreamingMessageId: (messageId: string | null) => void;
  setRecommendationReason: (reason: string) => void;
};

const initialSession: ChatbotSession = {
  messages: [],
  isLoading: false,
  currentQuestion: null,
  recommendedGroup: null,
  recommendationReason: null,
  isRecommendationComplete: false,
  isSSEConnected: false,
  currentStreamingMessageId: null,
};

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set, get) => ({
      session: initialSession,
      isHydrated: false,

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };

        set((state) => ({
          session: {
            ...state.session,
            messages: [...state.session.messages, newMessage],
          },
        }));
      },

      updateMessage: (messageId, updates) => {
        set((state) => ({
          session: {
            ...state.session,
            messages: state.session.messages.map((msg) =>
              msg.id === messageId ? { ...msg, ...updates } : msg
            ),
          },
        }));
      },

      setCurrentQuestion: (question) => {
        set((state) => ({
          session: {
            ...state.session,
            currentQuestion: question,
          },
        }));
      },

      setLoading: (loading) => {
        set((state) => ({
          session: {
            ...state.session,
            isLoading: loading,
          },
        }));
      },

      setRecommendation: (group, reason) => {
        set((state) => ({
          session: {
            ...state.session,
            recommendedGroup: group,
            recommendationReason: reason,
            isRecommendationComplete: true,
          },
        }));
      },

      setRecommendationReason: (reason: string) => {
        set((state) => ({
          session: {
            ...state.session,
            recommendationReason: reason,
          },
        }));
      },

      clearSession: () => {
        set({
          session: initialSession,
        });
      },

      setHydrated: (state: boolean) => set({ isHydrated: state }),

      hasMessages: () => {
        const { session } = get();
        return session.messages.length > 0;
      },

      setSSEConnected: (connected: boolean) => {
        set((state) => ({
          session: {
            ...state.session,
            isSSEConnected: connected,
          },
        }));
      },

      setCurrentStreamingMessageId: (messageId: string | null) => {
        set((state) => ({
          session: {
            ...state.session,
            currentStreamingMessageId: messageId,
          },
        }));
      },
    }),
    {
      name: "chatbot-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
      partialize: (state) => ({
        session: state.session,
      }),
    }
  )
);
