// src/shared/store/chatbot-store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ChatMessage = {
    id: string;
    role: 'ai' | 'user';
    text: string;
    options?: string[];
    timestamp: number;
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
};

type ChatbotState = {
    session: ChatbotSession;
    isHydrated: boolean;

    // Actions - setSessionId 제거
    addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    setCurrentQuestion: (question: { question: string; options: string[] } | null) => void;
    setLoading: (loading: boolean) => void;
    setRecommendation: (group: ChatbotSession['recommendedGroup'], reason: string) => void;
    clearSession: () => void;
    setHydrated: (state: boolean) => void;
    hasMessages: () => boolean;
};

const initialSession: ChatbotSession = {
    // sessionId 제거
    messages: [],
    isLoading: false,
    currentQuestion: null,
    recommendedGroup: null,
    recommendationReason: null,
    isRecommendationComplete: false,
};

export const useChatbotStore = create<ChatbotState>()(
    persist(
        (set, get) => ({
            session: initialSession,
            isHydrated: false,

            // setSessionId 액션 제거

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
                    }
                }));
            },

            setCurrentQuestion: (question) => {
                set((state) => ({
                    session: {
                        ...state.session,
                        currentQuestion: question,
                    }
                }));
            },

            setLoading: (loading) => {
                set((state) => ({
                    session: {
                        ...state.session,
                        isLoading: loading,
                    }
                }));
            },

            setRecommendation: (group, reason) => {
                set((state) => ({
                    session: {
                        ...state.session,
                        recommendedGroup: group,
                        recommendationReason: reason,
                        isRecommendationComplete: true,
                    }
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
        }),
        {
            name: 'chatbot-storage',
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
