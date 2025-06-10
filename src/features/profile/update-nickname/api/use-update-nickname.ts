import { profileQuery } from "@/entities/profile";
import { patch } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNickname = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (nickname: string): Promise<void> => {
            const response = await patch("/api/v2/users/me/nickname", { nickname });
            const data = await response.json();

            if (data.code !== 200) {
                throw new Error(data.message || "닉네임 변경에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: profileQuery.profile().queryKey,
            });
            successToast("닉네임이 변경되었습니다.");
        },
        onError: (error) => {
            errorToast("닉네임 변경 실패", error.message);
        },
    });
};
