// src/widgets/group-details/lib/use-group.ts
import { useQuery } from "@tanstack/react-query";
import { getGroupDetails } from "../api/get-group-details";


export const useGroupById = (groupId: number) => {
    return useQuery({
        queryKey: ["group", groupId],
        queryFn: () => getGroupDetails(groupId),
        enabled: !!groupId,
        staleTime: 1000 * 60 * 5, //3600ms
    });
};