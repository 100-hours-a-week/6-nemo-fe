import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToGroup } from "../api/apply-to-group";

export const useApplyToGroup = (groupId: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => applyToGroup(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group", Number(groupId)] });
        }
    });
};