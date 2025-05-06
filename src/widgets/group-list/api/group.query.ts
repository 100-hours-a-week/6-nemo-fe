import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchParams, SearchResponse } from "@/entities/group/model/types";
import { getGroups, searchGroups } from "./get-groups";

export const groupsListKeys = {
    all: ['groups'] as const,
    list: (params: SearchParams) => [...groupsListKeys.all, 'list', params] as const,
    search: (params: SearchParams) => [...groupsListKeys.all, 'search', params] as const,
};

// 일반 모임 목록 무한 스크롤 쿼리 훅
export const useGroupsListInfiniteQuery = (params: SearchParams = {}) => {
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
        },
    });
};

// 모임 검색 무한 스크롤 쿼리 훅
export const useGroupsSearchInfiniteQuery = (params: SearchParams = {}) => {
    return useInfiniteQuery({
        queryKey: groupsListKeys.search(params),
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
    });
};