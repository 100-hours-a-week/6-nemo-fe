export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const KAKAO_AUTH_URL = `${BASE_URL}/api/v1/auth/login/kakao?redirect_uri=http://localhost:3000/login`