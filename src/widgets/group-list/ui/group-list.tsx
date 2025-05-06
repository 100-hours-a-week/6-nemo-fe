"use client";

import { useEffect, useRef } from "react";
import { GroupCard } from "@/entities/group";
import { useGroupsListInfiniteQuery } from "../api/group.query";
import { GroupsListProps } from "../model/types";

export const GroupsList = ({ initialData, params = {} }: GroupsListProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGroupsListInfiniteQuery(params, initialData);

  useEffect(() => {
    // 이전 observer 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 새 observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    // observer 연결
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 그룹 리스트 생성
  const allGroups = data?.pages.flatMap((page) => page.groups) || [];

  if (status === "pending" && !initialData) {
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
        <GroupCard key={group.id} group={group} />
      ))}

      {/* 더 불러오기를 위한 참조 요소 */}
      <div ref={loadMoreRef} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-2">
            <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* 모든 결과를 로드한 경우 안내 메시지 */}
      {!hasNextPage && allGroups.length > 0 && (
        <div className="text-caption-1 text-label-normal pt-2 text-center">
          모든 결과를 불러왔습니다. (총 {data?.pages[0].totalElements}개)
        </div>
      )}
    </div>
  );
};
