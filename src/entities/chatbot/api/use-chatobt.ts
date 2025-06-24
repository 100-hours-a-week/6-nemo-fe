// src/features/chatbot/hooks/use-chatbot.ts
import { errorToast } from "@/shared/lib";
import { useChatbotStore } from "@/shared/store/chatbot-store";
import { useMutation } from "@tanstack/react-query";
import { createChatbotSession, generateQuestion, getRecommendation } from "../api/chatbot-api";

export const useChatbot = () => {
    const {
        session,
        addMessage,
        setCurrentQuestion,
        setLoading,
        setRecommendation,
        clearSession,
        hasMessages,
        isHydrated,
    } = useChatbotStore();

    // 새로운 세션 생성 뮤테이션
    const createSessionMutation = useMutation({
        mutationFn: createChatbotSession,
        onSuccess: () => {
            generateQuestionMutation.mutate(null);
        },
        onError: (error) => {
            errorToast("세션 생성 실패", error.message);
        },
    });

    // 질문 생성 뮤테이션
    const generateQuestionMutation = useMutation({
        mutationFn: (answer: string | null) => generateQuestion(answer),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            addMessage({
                role: 'ai',
                text: data.question,
                options: data.answer,
            });

            setCurrentQuestion({
                question: data.question,
                options: data.answer,
            });

            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
            errorToast("질문 생성 실패", error.message);
        },
    });

    // 추천 요청 뮤테이션
    const getRecommendationMutation = useMutation({
        mutationFn: () => getRecommendation(),
        onMutate: () => {
            setLoading(true);
            addMessage({
                role: 'ai',
                text: "입력해주신 정보를 바탕으로 맞춤 모임을 찾아드리고 있어요! 잠시만 기다려주세요... 🔍",
            });
        },
        onSuccess: (data) => {
            setRecommendation(data.group, data.reason);

            const recommendationMessage = `🎉 맞춤 모임을 찾았어요!\n\n**${data.group.name}**\n📍 ${data.group.location}\n👥 ${data.group.currentUserCount}/${data.group.maxUserCount}명\n\n${data.group.summary}\n\n**추천 이유:** ${data.reason}`;

            addMessage({
                role: 'ai',
                text: recommendationMessage,
            });

            setCurrentQuestion(null);
            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
            errorToast("추천 요청 실패", error.message);
        },
    });

    // 답변 전송
    const sendAnswer = (answer: string) => {
        addMessage({
            role: 'user',
            text: answer,
        });

        // 질문 횟수 확인 (3번째 질문 이후 추천 요청)
        const questionCount = session.messages.filter(msg => msg.role === 'ai' && msg.options).length;

        if (questionCount >= 3) {
            // 3번째 질문 완료 후 추천 요청
            getRecommendationMutation.mutate();
        } else {
            generateQuestionMutation.mutate(answer);
        }
    };

    // 새로운 대화 시작
    const startNewChat = () => {
        clearSession();
        createSessionMutation.mutate();
    };

    // 초기화 (페이지 첫 진입 시)
    const initializeChatbot = () => {
        if (!isHydrated) return;

        if (!hasMessages()) {
            // 기존 대화가 없으면 새 세션 시작
            createSessionMutation.mutate();
        }
    };

    return {
        session,
        isLoading: session.isLoading || createSessionMutation.isPending,
        sendAnswer,
        startNewChat,
        initializeChatbot,
        isHydrated,
    };
};
