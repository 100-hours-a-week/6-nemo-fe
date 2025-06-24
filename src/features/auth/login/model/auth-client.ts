import { BASE_URL } from "@/shared/constants";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: (reason?: any) => void;
    config: RequestInit & { url: string };
}> = [];

const processQueue = (error: any) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            // 갱신 성공 시 원래 요청 재시도
            prom.resolve(apiClient(prom.config.url, prom.config));
        }
    });

    failedQueue = [];
};

// 기본 API 클라이언트 - 쿠키 기반 인증
export const apiClient = async (url: string, config: RequestInit = {}): Promise<Response> => {
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    // Headers 객체 생성
    const headers = new Headers(config.headers || {});

    // Content-Type 설정 (기본값)
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // 요청 설정
    const requestConfig: RequestInit = {
        ...config,
        headers,
        credentials: 'include',
    };

    try {
        const response = await fetch(fullUrl, requestConfig);

        // 401 토큰 만료
        if (response.status === 401) {
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
                const refreshResponse = await fetch(`${BASE_URL}/api/v1/auth/token/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (refreshResponse.ok) {
                    // 갱신 성공 - 큐에 저장된 요청들 처리
                    processQueue(null);

                    return await fetch(fullUrl, requestConfig);
                } else {
                    // 갱신 실패 - 로그인 페이지로 리다이렉트
                    processQueue(new Error('Token refresh failed'));
                    window.location.href = '/login';
                    throw new Error('Authentication failed');
                }
            } catch (refreshError) {
                // 토큰 재발급 실패 시 로그아웃 처리
                processQueue(refreshError);
                window.location.href = '/login';
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }

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
