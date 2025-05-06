import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchParams, SearchResponse } from "@/entities/group/model/types";
import { searchGroups } from "./get-groups";

export const groupsListKeys = {
    all: ['groups'] as const,
    list: (params: SearchParams) => [...groupsListKeys.all, 'list', params] as const,
};

export const useGroupsListInfiniteQuery = (
    params: SearchParams = {},
    initialData?: SearchResponse['data']
) => {
    return useInfiniteQuery({
        queryKey: groupsListKeys.list(params),
        queryFn: async ({ pageParam = 0 }) => {
            const response = await searchGroups({
                ...params,
                page: pageParam,
            });
            return response.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        },
        initialData: initialData ? {
            pages: [initialData],
            pageParams: [0],
        } : undefined,
    });
};