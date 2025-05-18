import { BASE_URL } from "@/shared/constants";

export const refreshAccessToken = async (): Promise<{ accessToken: string; accessTokenExpiresIn: number }> => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/token/refresh`, {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(data.message || "토큰 재발급에 실패했습니다.");
        }

        return data.data;
    } catch (error) {
        throw error;
    }
};