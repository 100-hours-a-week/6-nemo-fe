
import { profileQuery } from "@/entities/profile";
import { BASE_URL } from "@/shared/constants";
import { errorToast, GAerrorTracking, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: string): Promise<void> => {
            const formData = new FormData();
            formData.append("profileImage", file);

            const response = await fetch(`${BASE_URL}/api/v2/users/me/profile-image`, {
                method: "PATCH",
                headers: {
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
            GAerrorTracking('api_error', error, 'profile_image_update');
            errorToast("프로필 이미지 변경 실패", error.message);
        },
    });
};
