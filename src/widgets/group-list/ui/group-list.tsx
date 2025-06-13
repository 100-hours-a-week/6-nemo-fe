"use client";

import { GroupCard } from "@/entities/group";
import { groupQuery } from "@/entities/group/api/group.query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export const GroupList = ({
  category,
  keyword,
}: {
  keyword?: string;
  category?: string;
}) => {
  const { ref: loadMoreRef, inView } = useInView();

  // 모임 리스트 쿼리 유형
  const queryOpt = category
    ? groupQuery.categoryGroups(category) // 카테고리별 모임 쿼리
    : keyword
      ? groupQuery.searchGroups(keyword) // 키워드 검색 모임 쿼리
      : groupQuery.allGroups(); // 전체 모임 쿼리

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(queryOpt);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const { groups } = useMemo(() => {
    const groupArray = data?.pages.flatMap((page) => page.groups) ?? [];

    return { groups: groupArray };
  }, [data]);

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-error py-8 text-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-body-1 py-8 text-center text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, index) => (
        <GroupCard key={`group-${group.groupId}-${index}`} group={group} />
      ))}

      <div ref={loadMoreRef} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-2">
            <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        )}
      </div>

      {!hasNextPage && groups.length > 0 && (
        <div className="text-caption-1 text-label-normal pt-2 text-center">
          모든 모임을 불러왔습니다.
        </div>
      )}
    </div>
  );
};
