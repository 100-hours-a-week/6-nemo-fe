export const BASE_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
export const KAKAO_AUTH_URL = `${BASE_URL}/api/v1/auth/login/kakao?${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`