import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getAllGroups } from "./get-all-groups";
import { getCategoryGroups } from "./get-category-groups";
import { getGroupDetails } from "./get-group-details";
import { getGroupMembers } from "./get-group-members";
import { getMyGroups } from "./get-my-groups";
import { getSearchGroups } from "./get-search-groups";

export const groupQuery = {
    all: () => ["group"] as const,

    lists: () => [...groupQuery.all(), "list"] as const,

    details: () => [...groupQuery.all(), "detail"] as const,
    // 모임 상세 조회
    detail: (groupId: number) =>
        queryOptions({
            queryKey: [...groupQuery.details(), groupId],
            queryFn: () => getGroupDetails(groupId),
            enabled: !!groupId,
            staleTime: 1000 * 60 * 5,
        }),

    // 모임 멤버 조회
    members: (groupId: number) =>
        queryOptions({
            queryKey: [...groupQuery.all(), "members", groupId],
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

    myGroups: () =>
        queryOptions({
            queryKey: [...groupQuery.lists(), "me"],
            queryFn: () => getMyGroups(),
            staleTime: 1000 * 60 * 5,
        }),
};
