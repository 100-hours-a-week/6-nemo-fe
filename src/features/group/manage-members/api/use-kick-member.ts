import { groupQuery } from "@/entities/group/api/group.query";
import { del } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useKickMember = (groupId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string): Promise<void> => {
            const response = await del(`/api/v2/groups/${groupId}/participants/${userId}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "모임원 추방에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });

            queryClient.refetchQueries({
                queryKey: groupQuery.detail(groupId).queryKey
            });

            successToast("모임원이 추방되었습니다.");
        },
        onError: (error) => {
            errorToast("모임원 추방에 실패했습니다.", error.message);
        }
    });
};
