import { get } from "@/features/auth/login";

export const getGroupMembers = async (groupId: string | number) => {
    const response = await get(`/api/v1/groups/${groupId}/participants`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "모임원 목록을 불러오는데 실패했습니다.");
    }

    return data.data.participants;
};
