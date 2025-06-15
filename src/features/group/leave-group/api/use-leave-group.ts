import { groupQuery } from "@/entities/group/api/group.query";
import { del } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLeaveGroup = (groupId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<void> => {
            const response = await del(`/api/v2/groups/${groupId}/participants/me`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "모임 탈퇴에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });
            queryClient.invalidateQueries({
                queryKey: groupQuery.myGroups().queryKey
            });

            successToast("모임에서 탈퇴되었습니다.");
        },
        onError: (error) => {
            errorToast("모임 탈퇴에 실패했습니다.", error.message);
        }
    });
};
