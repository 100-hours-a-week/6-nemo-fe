import { get } from "@/features/auth/model/auth-client";

export const getMyGroups = async () => {
    const response = await get(`/api/v1/groups/me`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "모임원 목록을 불러오는데 실패했습니다.");
    }

    return data.data.groups;
};
