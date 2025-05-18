import { useQuery } from "@tanstack/react-query";
import { getGroupMembers } from "../api/get-group-members";
import { Member } from "../model/types";

export const useGroupMembers = (groupId: string | number) => {
    return useQuery({
        queryKey: ["group-members", groupId],
        queryFn: () => getGroupMembers(groupId),
        staleTime: 1000 * 60 * 5,
    });
};