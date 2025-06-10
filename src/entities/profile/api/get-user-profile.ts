
import { get } from "@/features/auth/login/model/auth-client";
import { UserProfile } from "../model/types";

export const getUserProfile = async (): Promise<UserProfile> => {
    const response = await get("/api/v2/users/me")
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "프로필 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};
