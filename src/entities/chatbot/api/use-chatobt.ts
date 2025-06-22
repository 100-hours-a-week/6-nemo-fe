import { errorToast } from "@/shared/lib";
import { useChatbotStore } from "@/shared/store/chatbot-store";
import { useMutation } from "@tanstack/react-query";
import { createChatbotSession, generateQuestion, getRecommendation } from "../api/chatbot-api";

export const useChatbot = () => {
    const {
        session,
        setSessionId,
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
        onSuccess: (sessionId) => {
            setSessionId(sessionId);
            // 세션 생성 후 첫 질문 요청
            generateQuestionMutation.mutate({ sessionId, answer: null });
        },
        onError: (error) => {
            errorToast("세션 생성 실패", error.message);
        },
    });

    // 질문 생성 뮤테이션
    const generateQuestionMutation = useMutation({
        mutationFn: ({ sessionId, answer }: { sessionId: string; answer: string | null }) =>
            generateQuestion(sessionId, answer),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            // AI 질문을 메시지로 추가
            addMessage({
                role: 'ai',
                text: data.question,
                options: data.answer,
            });

            // 현재 질문 상태 업데이트
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
        mutationFn: (sessionId: string) => getRecommendation(sessionId),
        onMutate: () => {
            setLoading(true);
            // "추천을 준비하고 있습니다..." 메시지 추가
            addMessage({
                role: 'ai',
                text: "입력해주신 정보를 바탕으로 맞춤 모임을 찾아드리고 있어요! 잠시만 기다려주세요... 🔍",
            });
        },
        onSuccess: (data) => {
            setRecommendation(data.group, data.reason);

            // 추천 결과 메시지 추가
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
        if (!session.sessionId) return;

        // 사용자 메시지 추가
        addMessage({
            role: 'user',
            text: answer,
        });

        // 질문 횟수 확인 (3번째 질문 이후 추천 요청)
        console.log(session.messages.filter(msg => msg.role === 'ai' && msg.options))
        const questionCount = session.messages.filter(msg => msg.role === 'user' && msg.options).length;

        if (questionCount >= 2) {
            // 3번째 질문 완료 후 추천 요청
            getRecommendationMutation.mutate(session.sessionId);
        } else {
            // 다음 질문 생성
            generateQuestionMutation.mutate({
                sessionId: session.sessionId,
                answer
            });
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

        if (!hasMessages() || !session.sessionId) {
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
