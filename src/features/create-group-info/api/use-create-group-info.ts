import { useMutation } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { CreateGroupInfoRequest, GeneratedGroupData } from "@/entities/group/model/types";

export const useCreateGroupInfo = () => {
    return useMutation({
        mutationFn: async (data: CreateGroupInfoRequest): Promise<GeneratedGroupData> => {
            const response = await post(`/api/v1/groups/ai-generate`, data);
            const result = await response.json();

            if (result.code !== 200) {
                throw new Error(result.message || "모임 정보 생성에 실패했습니다.");
            }

            return result.data;
        },
    });
};