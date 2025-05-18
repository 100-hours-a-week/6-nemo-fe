"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteSearchGroups } from "../model/use-infinite-search-groups";
import { useInfiniteCategoryGroups } from "../model/use-infinite-category-groups";
import { useInfiniteAllGroups } from "../model/use-infinite-all-groups";
import { GroupCard } from "@/entities/group";

export const GroupList = ({
  category,
  keyword,
}: {
  keyword?: string;
  category?: string;
}) => {
  const { ref: loadMoreRef, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    category
      ? useInfiniteCategoryGroups(category)
      : keyword
        ? useInfiniteSearchGroups(keyword)
        : useInfiniteAllGroups();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allGroups = data?.pages.flatMap((page) => page.groups) ?? [];

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

  if (allGroups.length === 0) {
    return (
      <div className="text-body-1 py-8 text-center text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allGroups.map((group) => (
        <GroupCard key={`group-${group.id}`} group={group} />
      ))}

      <div ref={loadMoreRef} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-2">
            <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        )}
      </div>

      {!hasNextPage && allGroups.length > 0 && (
        <div className="text-caption-1 text-label-normal pt-2 text-center">
          모든 데이터를 불러왔습니다.
        </div>
      )}
    </div>
  );
};
