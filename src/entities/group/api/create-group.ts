import { post } from "@/features/auth/model/auth-client";
import { CreateGroupRequest, GroupDetails } from "../model/types";

export const createGroup = async (data: CreateGroupRequest): Promise<GroupDetails> => {
    const response = await post("/api/v1/groups", data);
    const result = await response.json();

    if (result.code !== 201) {
        throw new Error(result.message || "모임 생성에 실패했습니다.");
    }

    return result.data;
};