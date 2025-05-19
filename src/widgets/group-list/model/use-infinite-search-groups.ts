import { getSearchGroups } from "@/entities/group";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteSearchGroups = (keyword: string) => {
    return useInfiniteQuery({
        queryKey: ["groups", "search", keyword],
        queryFn: ({ pageParam = 0 }) =>
            getSearchGroups(keyword, pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
        enabled: !!keyword, // 빈 검색어일 경우 실행 안 함
    });
};
