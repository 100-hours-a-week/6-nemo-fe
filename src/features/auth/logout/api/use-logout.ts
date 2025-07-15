import { del, errorToast, GAerrorTracking, successToast } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (): Promise<void> => {
            const response = await del("/api/v1/auth/logout/kakao");

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "로그아웃에 실패했습니다.");
            }
        },
        onSuccess: () => {
            successToast("로그아웃되었습니다.");
            router.push('/login')
        },
        onError: (error) => {
            GAerrorTracking('api_error', error, 'logout');
            errorToast("로그아웃 실패", error.message);
        },
    });
};
