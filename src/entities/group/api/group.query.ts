import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getAllGroups } from "./get-all-groups";
import { getCategoryGroups } from "./get-category-groups";
import { getSearchGroups } from "./get-search-groups";
import { getGroupDetails } from "./get-group-details";
import { getGroupMembers } from "./get-group-members";

export const groupQuery = {
    all: () => ["group"] as const,

    lists: () => [...groupQuery.all(), "list"] as const,

    // 모임 상세 조회
    details: () => [...groupQuery.all(), "detail"] as const,
    detail: (groupId: number) =>
        queryOptions({
            queryKey: [...groupQuery.details(), groupId],
            queryFn: () => getGroupDetails(groupId),
            enabled: !!groupId,
            staleTime: 1000 * 60 * 5,
        }),

    // 모임 멤버 조회
    members: () => [...groupQuery.all(), "members"] as const,
    groupMembers: (groupId: string | number) =>
        queryOptions({
            queryKey: [...groupQuery.members(), groupId],
            queryFn: () => getGroupMembers(groupId),
            enabled: !!groupId,
            staleTime: 1000 * 60 * 5,
        }),

    // 전체 모임 조회
    allGroups: () =>
        infiniteQueryOptions({
            queryKey: [...groupQuery.lists(), "all"],
            queryFn: ({ pageParam = 0 }: { pageParam: number }) => getAllGroups(pageParam),
            getNextPageParam: (lastPage: any) => {
                return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
            staleTime: 1000 * 60 * 5,
        }),

    // 카테고리 모임 조회
    categoryGroups: (category: string) =>
        infiniteQueryOptions({
            queryKey: [...groupQuery.lists(), "category", category],
            queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
                getCategoryGroups(category, pageParam),
            getNextPageParam: (lastPage: any) => {
                return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
            enabled: !!category,
            staleTime: 1000 * 60 * 5,
        }),
    // 검색 모임 조회
    searchGroups: (keyword: string) =>
        infiniteQueryOptions({
            queryKey: [...groupQuery.lists(), "search", keyword],
            queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
                getSearchGroups(keyword, pageParam),
            getNextPageParam: (lastPage: any) => {
                return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
            enabled: !!keyword,
            staleTime: 1000 * 60 * 2,
        }),
};