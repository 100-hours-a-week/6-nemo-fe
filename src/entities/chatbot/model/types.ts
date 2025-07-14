export type ChatbotQuestionRequest = {
  answer: string | null;
};

export type ChatbotQuestionResponse = {
  code: number;
  message: string;
  data: {
    question: string;
    options: string[];
  };
};

export type ChatbotRecommendationResponse = {
  code: number;
  message: string;
  data: {
    group: {
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
    };
    reason: string;
  };
};

// SSE 메시지 타입들
export type SSEMessageType =
  | "QUESTION_CHUNK"
  | "QUESTION_OPTIONS"
  | "QUESTION_DONE"
  | "RECOMMEND_ID"
  | "RECOMMEND_REASON"
  | "RECOMMEND_DONE"
  | "ERROR"
  | "PING";

export type SSEMessage = {
  type: SSEMessageType;
  payload: {
    text?: string;
    options?: string[];
    groupId?: number;
    name?: string;
    category?: string;
    summary?: string;
    description?: string;
    location?: string;
    currentUserCount?: number;
    maxUserCount?: number;
    imageUrl?: string | null;
    tags?: string[];
    reason?: string;
    code?: number;
    message?: string;
  };
};

export type ChatbotSessionResponse = {
  code: number;
  message: string;
  data: null;
};
