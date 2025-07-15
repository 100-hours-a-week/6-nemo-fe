import { BASE_URL } from "@/shared/constants";
import { get, post } from "@/shared/lib";
import { SSEMessage } from "../model/types";

// 새로운 세션 생성
export const createChatbotSession = async (): Promise<void> => {
  try {
    const response = await post("/api/v2/groups/recommendations/session", {});
    const data = await response.json();

    if (data.code !== 204) {
      throw new Error(data.message || "세션 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("세션 생성 오류:", error);
    throw error;
  }
};

// SSE 스트리밍 연결
export const createSSEConnection = (
  onMessage: (message: SSEMessage) => void,
  onError: (error: Event) => void,
  onOpen?: () => void,
  onClose?: () => void
): EventSource => {
  const eventSource = new EventSource(
    `${BASE_URL}/api/v2/groups/recommendations/chatbot/stream`,
    {
      withCredentials: true,
    }
  );

  // ai_response 커스텀 이벤트 구독
  eventSource.addEventListener("ai_response", (event) => {
    try {
      const message: SSEMessage = JSON.parse(event.data);
      onMessage(message);
    } catch (error) {
      console.error("SSE 메시지 파싱 오류:", error);
    }
  });

  // ping 이벤트 구독
  eventSource.addEventListener("ping", (event) => {
    try {
      const message: SSEMessage = JSON.parse(event.data);
      onMessage(message);
    } catch (error) {
      console.error("SSE ping 메시지 파싱 오류:", error);
    }
  });

  // 기본 message 이벤트도 유지 (fallback)
  eventSource.onmessage = (event) => {
    try {
      const message: SSEMessage = JSON.parse(event.data);
      onMessage(message);
    } catch (error) {
      console.error("SSE 메시지 파싱 오류:", error);
    }
  };

  eventSource.onerror = (event) => {
    if (eventSource.readyState === EventSource.CLOSED && onClose) {
      onClose();
    }
    onError(event);
  };

  eventSource.onopen = () => {
    if (onOpen) {
      onOpen();
    }
  };

  return eventSource;
};

// 질문 생성 요청 (SSE)
export const generateQuestion = async (
  answer: string | null = null
): Promise<void> => {
  try {
    const response = await post("/api/v2/groups/recommendations/questions", {
      answer,
    });
    const responseText = await response.json();

    if (responseText.code !== 200) {
      throw new Error(responseText.message || "질문 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("질문 생성 오류:", error);
    throw error;
  }
};

// 모임 추천 요청 (SSE)
export const getRecommendation = async (): Promise<void> => {
  try {
    const response = await get("/api/v2/groups/recommendations");
    const responseText = await response.json();

    if (responseText.code !== 200) {
      throw new Error(responseText.message || "추천 요청에 실패했습니다.");
    }
  } catch (error) {
    console.error("모임 추천 오류:", error);
    throw error;
  }
};
