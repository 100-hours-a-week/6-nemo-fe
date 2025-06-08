import { groupQuery } from "@/entities/group/api/group.query";
import { post } from "@/features/auth/model/auth-client";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JOIN_GROUP_MESSAGES } from "../model/constants";

export const useJoinToGroup = (groupId: number) => {
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
            queryClient.refetchQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });
            queryClient.refetchQueries({
                queryKey: groupQuery.detail(groupId).queryKey
            });

            successToast(JOIN_GROUP_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            errorToast(JOIN_GROUP_MESSAGES.ERROR, error.message);
        }
    });
};
