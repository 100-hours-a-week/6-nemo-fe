import { groupQuery } from "@/entities/group/api/group.query";
import { del } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGroup = (groupId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<void> => {
            const response = await del(`/api/v2/groups/${groupId}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "모임 삭제에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.lists()
            });
            queryClient.invalidateQueries({
                queryKey: groupQuery.myGroups().queryKey
            });
            queryClient.removeQueries({
                queryKey: groupQuery.detail(groupId).queryKey
            });

            successToast("모임이 삭제되었습니다");
        },
        onError: (error) => {
            errorToast("모임 삭제에 실패했습니다", error.message);
        }
    });
};
