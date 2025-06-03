import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { groupQuery } from "@/entities/group/api/group.query";

export const useApplyToGroup = (groupId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<boolean> => {
            const response = await post(`/api/v1/groups/${groupId}/applications`, {});

            if (response.status !== 204) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "모임 가입 신청에 실패했습니다.");
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.groupMembers(groupId).queryKey
            });
        }
    });
};