import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { CreateGroupRequest, GroupDetails } from "@/entities/group/model/types";
import { groupQuery } from "@/entities/group/api/group.query";
import { errorToast, successToast } from "@/shared/lib";
import { CREATE_GROUP_MESSAGES } from "../model/constants";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateGroupRequest): Promise<GroupDetails> => {
            const response = await post("/api/v1/groups", data);
            const result = await response.json();

            if (result.code !== 201) {
                throw new Error(result.message);
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.lists()
            });

            successToast(CREATE_GROUP_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            errorToast(CREATE_GROUP_MESSAGES.ERROR, error.message);
        }
    });
};