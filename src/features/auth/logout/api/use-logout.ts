
import { errorToast, successToast } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { del } from "../../login/model/auth-client";

export const useLogout = () => {
    return useMutation({
        mutationFn: async (): Promise<void> => {
            const response = await del("/api/v1/auth/logout/kakao");
            const data = await response.json();

            if (data.code !== 200) {
                throw new Error(data.message || "로그아웃에 실패했습니다.");
            }
        },
        onSuccess: () => {
            successToast("로그아웃되었습니다.");
        },
        onError: (error) => {
            errorToast("로그아웃 실패", error.message);
        },
    });
};
