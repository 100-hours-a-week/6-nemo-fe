import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { groupQuery } from "@/entities/group/api/group.query";
import { toast } from "sonner";

export const useJoinToGroup = (groupId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<boolean> => {
            const response = await post(`/api/v1/groups/${groupId}/applications`, {});

            if (response.status !== 204) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "모임 가입 신청에 실패했습니다.");
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });

            // 성공 토스트 메시지 표시
            toast.success("모임 가입 신청이 완료되었습니다!", {
                position: "top-center",
            });
        },
        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "모임 가입 신청에 실패했습니다.",
                {
                    description: "잠시 후 다시 시도해주세요.",
                    position: "top-center",
                },
            );
        }
    });
};