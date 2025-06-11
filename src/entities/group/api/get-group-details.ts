import { get } from "@/features/auth/login";
import { BASE_URL } from "@/shared/constants";
import { GroupDetails } from "../model/types";

export const getGroupDetails = async (groupId: number): Promise<GroupDetails> => {
    const response = await get(`${BASE_URL}/api/v1/groups/${groupId}`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "모임 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};
