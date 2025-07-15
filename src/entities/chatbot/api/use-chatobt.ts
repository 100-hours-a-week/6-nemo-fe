import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { errorToast, GAerrorTracking } from "@/shared/lib";
import { useChatbotStore } from "@/shared/store/chatbot-store";
import {
  createChatbotSession,
  createSSEConnection,
  generateQuestionSSE,
  getRecommendationSSE,
} from "../api/chatbot-api";
import { SSEMessage } from "../model/types";

export const useChatbot = () => {
  const {
    session,
    addMessage,
    updateMessage,
    setCurrentQuestion,
    setLoading,
    setRecommendation,
    clearSession,
    hasMessages,
    isHydrated,
    setSSEConnected,
    setCurrentStreamingMessageId,
    setRecommendationReason, // 추가
  } = useChatbotStore();

  const eventSourceRef = useRef<EventSource | null>(null);
  const currentStreamingMessageIdRef = useRef<string | null>(null); // 질문 스트리밍 메시지 ID
  const currentStreamingTextRef = useRef<string>(""); // 질문 스트리밍 텍스트
  const currentRecommendMessageIdRef = useRef<string | null>(null); // 추천 이유 스트리밍 메시지 ID
  const currentRecommendTextRef = useRef<string>(""); // 추천 이유 스트리밍 텍스트

  // SSE 메시지 핸들러
  const handleSSEMessage = (message: SSEMessage) => {
    switch (message.type) {
      case "QUESTION_CHUNK":
        if (message.payload.text) {
          const currentMessageId = currentStreamingMessageIdRef.current;
          if (currentMessageId) {
            currentStreamingTextRef.current += message.payload.text;
            updateMessage(currentMessageId, {
              text: currentStreamingTextRef.current,
              isStreaming: true,
            });
          } else {
            const newMessageId = Date.now().toString();
            currentStreamingTextRef.current = message.payload.text;
            addMessage({
              role: "ai",
              text: message.payload.text,
              isStreaming: true,
            });
            currentStreamingMessageIdRef.current = newMessageId;
            setCurrentStreamingMessageId(newMessageId);
          }
        }
        break;

      case "QUESTION_OPTIONS":
        if (message.payload.options) {
          const currentMessageId = currentStreamingMessageIdRef.current;
          if (currentMessageId) {
            updateMessage(currentMessageId, {
              options: message.payload.options,
              isStreaming: false,
            });
            currentStreamingMessageIdRef.current = null;
            currentStreamingTextRef.current = "";
            setCurrentStreamingMessageId(null);
          }
        }
        break;

      case "QUESTION_DONE":
        const currentMessageId = currentStreamingMessageIdRef.current;
        if (currentMessageId) {
          updateMessage(currentMessageId, {
            isStreaming: false,
          });
          currentStreamingMessageIdRef.current = null;
          currentStreamingTextRef.current = "";
          setCurrentStreamingMessageId(null);
        }
        setLoading(false);
        break;

      case "RECOMMEND_ID":
        if (message.payload.groupId) {
          const group = {
            groupId: message.payload.groupId,
            name: message.payload.name || "",
            category: message.payload.category || "",
            summary: message.payload.summary || "",
            description: message.payload.description || "",
            location: message.payload.location || "",
            currentUserCount: message.payload.currentUserCount || 0,
            maxUserCount: message.payload.maxUserCount || 0,
            imageUrl: message.payload.imageUrl || null,
            tags: message.payload.tags || [],
          };
          setRecommendation(group, currentRecommendTextRef.current);
        }
        break;

      case "RECOMMEND_REASON":
        if (message.payload.reason) {
          const currentRecommendId = currentRecommendMessageIdRef.current;
          if (currentRecommendId) {
            currentRecommendTextRef.current += message.payload.reason;
            setRecommendationReason(currentRecommendTextRef.current);
          } else {
            const newMessageId = Date.now().toString();
            currentRecommendTextRef.current = message.payload.reason;
            currentRecommendMessageIdRef.current = newMessageId;
            setRecommendationReason(currentRecommendTextRef.current);
          }
        }
        break;

      case "RECOMMEND_DONE":
        const currentRecommendId = currentRecommendMessageIdRef.current;
        if (currentRecommendId) {
          updateMessage(currentRecommendId, {
            isStreaming: false,
          });
          currentRecommendMessageIdRef.current = null;
          currentRecommendTextRef.current = "";
        }
        setLoading(false);
        break;

      case "ERROR":
        if (message.payload.message) {
          errorToast("오류 발생", message.payload.message);
        }
        setLoading(false);
        break;

      case "PING":
        break;
    }
  };

  // SSE 연결 설정
  const setupSSEConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = createSSEConnection(
      handleSSEMessage,
      (error) => {
        console.error("SSE 연결 오류:", error);
        setSSEConnected(false);
        setLoading(false);
      },
      () => {
        setSSEConnected(true);
      },
      () => {
        setSSEConnected(false);
      }
    );
  };

  // 컴포넌트 언마운트 시 SSE 연결 정리
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // 새로운 세션 생성 뮤테이션
  const createSessionMutation = useMutation({
    mutationFn: createChatbotSession,
    onSuccess: () => {
      addMessage({
        role: "ai",
        text: "안녕하세요! 👋 당신에게 딱 맞는 모임을 추천해드릴게요. 몇가지 질문에만 답해주시면 금방 찾을 수 있어요 😊",
      });
      // 세션 생성 후 SSE 연결 설정
      setTimeout(() => {
        setupSSEConnection();
        // SSE 연결 후 질문 생성 요청
        setTimeout(() => {
          generateQuestionSSEMutation.mutate(null);
        }, 2000);
      }, 1000);
    },
    onError: (error) => {
      GAerrorTracking("api_error", error, "chabot_session_creation");
      errorToast("세션 생성 실패", error.message);
    },
  });

  // 질문 생성 뮤테이션 (SSE용)
  const generateQuestionSSEMutation = useMutation({
    mutationFn: (answer: string | null) => generateQuestionSSE(answer),
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      GAerrorTracking("api_error", error, "chabot_question_creation");
      setLoading(false);
      errorToast("질문 생성 실패", error.message);
    },
  });

  // 추천 요청 뮤테이션 (SSE용)
  const getRecommendationSSEMutation = useMutation({
    mutationFn: () => getRecommendationSSE(),
    onMutate: () => {
      setLoading(true);
      addMessage({
        role: "ai",
        text: "딱 맞는 모임을 추천해드리기 위해 탱글이가 열심히 알아보고 있어요.. 잠시만 기다려주세요! 🤖",
      });
    },
    onError: (error) => {
      GAerrorTracking("api_error", error, "chabot_recommendation");
      setLoading(false);
      errorToast("추천 요청 실패", error.message);
    },
  });

  // 답변 전송
  const sendAnswer = (answer: string) => {
    addMessage({
      role: "user",
      text: answer,
    });

    // 질문 횟수 확인 (3번째 질문 이후 추천 요청)
    const questionCount = session.messages.filter(
      (msg) => msg.role === "ai" && msg.options
    ).length;

    if (questionCount >= 3) {
      // 3번째 질문 완료 후 추천 요청
      getRecommendationSSEMutation.mutate();
    } else {
      generateQuestionSSEMutation.mutate(answer);
    }
  };

  // 새로운 대화 시작
  const startNewChat = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    currentStreamingMessageIdRef.current = null; // 로컬 ref 초기화
    currentStreamingTextRef.current = ""; // 텍스트 초기화
    clearSession();
    createSessionMutation.mutate();
  };

  // 초기화 (페이지 첫 진입 시)
  const initializeChatbot = () => {
    if (!isHydrated) return;

    if (!hasMessages()) {
      // 기존 대화가 없으면 새 세션 시작
      createSessionMutation.mutate();
    } else {
      // 기존 대화가 있으면 SSE 연결만 설정
      setupSSEConnection();
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
