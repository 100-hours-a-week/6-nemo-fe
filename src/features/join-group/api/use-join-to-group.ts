import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { groupQuery } from "@/entities/group/api/group.query";
import { JOIN_GROUP_MESSAGES } from "../model/constants";
import { errorToast, successToast } from "@/shared/lib";

export const useJoinToGroup = (groupId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<boolean> => {
            const response = await post(`/api/v1/groups/${groupId}/applications`, {});

            if (response.status !== 204) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });

            successToast(JOIN_GROUP_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            errorToast(JOIN_GROUP_MESSAGES.ERROR, error.message);
        }
    });
};