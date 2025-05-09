import { getCategoryGroups } from "@/entities/group";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCategoryGroups = (category: string) => {
    return useInfiniteQuery({
        queryKey: ["groups", "category", category],
        queryFn: ({ pageParam = 0 }) =>
            getCategoryGroups(category, pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
        enabled: !!category, // category 없을 때는 실행 X
    });
};
