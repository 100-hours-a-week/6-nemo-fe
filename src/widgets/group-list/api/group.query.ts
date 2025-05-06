import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchParams, SearchResponse } from "@/entities/group/model/types";
import { getGroups } from "./get-groups";

export const groupsListKeys = {
    all: ['groups'] as const,
    list: (params: SearchParams) => [...groupsListKeys.all, 'list', params] as const,
};

export const useGroupsListInfiniteQuery = (
    params: SearchParams = {}
) => {
    return useInfiniteQuery({
        queryKey: groupsListKeys.list(params),
        queryFn: async ({ pageParam = 0 }) => {
            const response = await getGroups({
                ...params,
                page: pageParam,
            });
            return response.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        }
    });
};