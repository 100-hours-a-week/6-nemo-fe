import { CreateGroupInfoRequest, CreateGroupInfoResponse } from "@/entities/group/model/types";
import { errorToast } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { CREATE_GROUP_INFO_MESSAGES } from "../model/constants";
import { post } from "@/features/auth/login";

export const useCreateGroupInfo = () => {
    return useMutation({
        mutationFn: async (data: CreateGroupInfoRequest): Promise<CreateGroupInfoResponse> => {
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
