
import { profileQuery } from "@/entities/profile";
import { BASE_URL } from "@/shared/constants";
import { errorToast, successToast } from "@/shared/lib";
import { useAuthStore } from "@/shared/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File): Promise<void> => {
            const formData = new FormData();
            formData.append("profileImage", file);

            const token = useAuthStore.getState().token;

            const response = await fetch(`${BASE_URL}/api/v2/users/me/profile-image`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
                credentials: "include",
            });

            const data = await response.json();

            if (data.code !== 200) {
                throw new Error(data.message || "프로필 이미지 변경에 실패했습니다.");
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
