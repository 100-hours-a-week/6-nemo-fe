import { groupQuery } from "@/entities/group/api/group.query";
import { patch } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateGroupImage = (groupId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (imageUrl: string): Promise<void> => {
            const response = await patch(`/api/v2/groups/${groupId}/image`, {
                imageUrl: imageUrl
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "모임 대표 사진 변경에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.lists()
            });
            queryClient.invalidateQueries({
                queryKey: groupQuery.myGroups().queryKey
            });

            successToast("모임 대표 사진이 변경되었습니다.");
        },
        onError: (error) => {
            errorToast("모임 대표 사진 변경에 실패했습니다.", error.message)
        }
    });
};
