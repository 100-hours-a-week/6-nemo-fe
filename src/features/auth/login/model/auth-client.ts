import { BASE_URL } from "@/shared/constants";
import { useAuthStore } from "@/shared/store/auth-store";
import { refreshAccessToken } from "./refresh-access-token";

// 재시도 상태를 추적하기 위한 변수
let isRefreshing = false;
// 제네릭 타입 T를 사용하여 타입 안전성 개선
let failedQueue: Array<{
    resolve: (value: Response | PromiseLike<Response>) => void; // 특정 타입으로 변경
    reject: (reason?: any) => void;
    config: RequestInit & { url: string };
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            const config = prom.config;

            // 헤더 생성 방식 변경
            if (token && config.headers) {
                // Headers 객체 생성
                const newHeaders = new Headers(config.headers);
                newHeaders.set('Authorization', `Bearer ${token}`);
                config.headers = newHeaders;
            }

            prom.resolve(apiClient(config.url, config));
        }
    });

    failedQueue = [];
};

// 기본 API 클라이언트 - 반환 타입을 명시적으로 Response로 지정
export const apiClient = async (url: string, config: RequestInit = {}): Promise<Response> => {
    // 완전한 URL 생성
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    // 토큰 가져오기
    const token = useAuthStore.getState().token;

    // Headers 객체 생성
    const headers = new Headers(config.headers || {});

    // Content-Type 설정 (기본값)
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // 토큰이 있으면 Authorization 헤더 추가
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // 요청 설정
    const requestConfig: RequestInit = {
        ...config,
        headers,
        credentials: 'include', // 쿠키를 포함시키기 위해 추가
    };

    try {
        const response = await fetch(fullUrl, requestConfig);

        // 401 에러 처리 (토큰 만료)
        if (response.status === 401) {
            // 원본 요청 설정 저장
            const originalRequest = {
                url,
                ...requestConfig,
            };

            // 이미 토큰 재발급 중이라면 큐에 추가
            if (isRefreshing) {
                return new Promise<Response>((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            isRefreshing = true;

            try {
                // 토큰 재발급 요청
                const refreshResult = await refreshAccessToken();
                const newToken = refreshResult.accessToken;

                // 새 토큰 저장
                useAuthStore.getState().login(newToken);

                // 헤더 업데이트
                if (requestConfig.headers instanceof Headers) {
                    requestConfig.headers.set('Authorization', `Bearer ${newToken}`);
                }

                // 큐에 저장된 요청 처리
                processQueue(null, newToken);

                // 원래 요청 다시 시도
                return await fetch(fullUrl, requestConfig);
            } catch (refreshError) {
                // 토큰 재발급 실패 시 로그아웃 처리
                processQueue(refreshError, null);
                useAuthStore.getState().logout();
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }

        // 응답 반환
        return response;
    } catch (error) {
        throw error;
    }
};

// GET 요청 헬퍼 함수
export const get = async (url: string, config: RequestInit = {}): Promise<Response> => {
    return apiClient(url, { ...config, method: "GET" });
};

// POST 요청 헬퍼 함수
export const post = async (url: string, data: any, config: RequestInit = {}): Promise<Response> => {
    return apiClient(url, {
        ...config,
        method: "POST",
        body: JSON.stringify(data),
    });
};

// PUT 요청 헬퍼 함수
export const put = async (url: string, data: any, config: RequestInit = {}): Promise<Response> => {
    return apiClient(url, {
        ...config,
        method: "PUT",
        body: JSON.stringify(data),
    });
};

// PATCH 요청 헬퍼 함수
export const patch = async (url: string, data: any, config: RequestInit = {}): Promise<Response> => {
    return apiClient(url, {
        ...config,
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

// DELETE 요청 헬퍼 함수
export const del = async (url: string, config: RequestInit = {}): Promise<Response> => {
    return apiClient(url, { ...config, method: "DELETE" });
};
