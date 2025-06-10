import { get } from "@/features/auth/login";
import { GroupItem } from "../model/types";

export const getMyGroups = async (): Promise<GroupItem[]> => {
    const response = await get(`/api/v1/groups/me`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "나의 모임 목록을 불러오는데 실패했습니다.");
    }

    return data.data.groups;
};
