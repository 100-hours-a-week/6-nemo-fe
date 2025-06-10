import { useMutation } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { CreateGroupInfoRequest, GeneratedGroupData } from "@/entities/group/model/types";
import { errorToast } from "@/shared/lib";
import { CREATE_GROUP_INFO_MESSAGES } from "../model/constants";

export const useCreateGroupInfo = () => {
    return useMutation({
        mutationFn: async (data: CreateGroupInfoRequest): Promise<GeneratedGroupData> => {
            const response = await post(`/api/v1/groups/ai-generate`, data);
            const result = await response.json();

            if (result.code !== 200) {
                throw new Error(result.message);
            }

            return result.data;
        },
        onError: (error) => {
            errorToast(CREATE_GROUP_INFO_MESSAGES.ERROR, error.message);
        }
    });
};
