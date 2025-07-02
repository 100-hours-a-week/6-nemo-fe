import { groupQuery } from "@/entities/group/api/group.query";
import { errorToast, GAbuttonClick, GAgroupAction, post, successToast, useConfetti } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { JOIN_GROUP_MESSAGES } from "../model/constants";

export const useJoinGroup = (groupId: number | string) => {
    const queryClient = useQueryClient();
    const confetti = useConfetti();
    const router = useRouter();

    return useMutation({
        mutationFn: async (): Promise<boolean> => {
            const response = await post(`/api/v1/groups/${groupId}/applications`, {});

            if (response.status !== 204) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            return true;
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: groupQuery.members(groupId).queryKey
            });
            successToast(JOIN_GROUP_MESSAGES.SUCCESS);

            router.refresh();
            confetti();

            // GA 추적 함수
            GAbuttonClick("join_group", "group_detail_page");
            GAgroupAction("join_attempt", groupId);
        },
        onError: (error) => {
            errorToast(JOIN_GROUP_MESSAGES.ERROR, error.message);
        }
    });
};
