
import { profileQuery } from "@/entities/profile";
import { BASE_URL } from "@/shared/constants";
import { errorToast, successToast } from "@/shared/lib";
import { useAuthStore } from "@/shared/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: string): Promise<void> => {
            const formData = new FormData();
            formData.append("profileImage", file);

            const token = useAuthStore.getState().token;

            const response = await fetch(`${BASE_URL}/api/v2/users/me/profile-image`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    profileImage: file,
                }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("프로필 이미지 변경에 실패했습니다.");
            }
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: profileQuery.profile().queryKey,
            });
            successToast("프로필 이미지가 변경되었습니다.");
        },
        onError: (error) => {
            errorToast("프로필 이미지 변경 실패", error.message);
        },
    });
};
