import { post } from "@/features/auth/model/auth-client";

export const applyToGroup = async (groupId: number | string) => {
    const response = await post(`/api/v1/groups/${groupId}/applications`, {});

    if (response.status !== 204) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "모임 가입 신청에 실패했습니다.");
    }

    return true;
};