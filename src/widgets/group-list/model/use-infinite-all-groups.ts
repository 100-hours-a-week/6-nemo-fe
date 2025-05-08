import { getAllGroups } from "@/entities/group";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteAllGroups = () => {
    return useInfiniteQuery({
        queryKey: ["groups", "all"],
        queryFn: ({ pageParam = 0 }) =>
            getAllGroups(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });
};
