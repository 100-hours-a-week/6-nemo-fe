"use client";

import { GroupCard } from "@/entities/group";
import { groupQuery } from "@/entities/group/api/group.query";
import { FloatingActionButton } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const MyGroupList = () => {
  const router = useRouter();

  const { data: groups, isLoading, error } = useQuery(groupQuery.myGroups());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error py-8 text-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-primary-light mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h3 className="text-heading-2 text-label-strong-1 mb-2 font-semibold">
          아직 참여한 모임이 없어요
        </h3>
        <p className="text-body-2 text-label-normal mb-6 text-center">
          관심있는 모임을 찾아 참여해보세요!
        </p>
        <button
          onClick={() => router.push("/groups")}
          className="bg-primary text-common-100 hover:bg-primary-strong rounded-full px-6 py-3 font-medium transition"
        >
          모임 둘러보기
        </button>

        <FloatingActionButton
          href="/groups/create"
          className="text-4xl font-extralight"
        >
          +
        </FloatingActionButton>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {groups.map((group, index) => (
          <GroupCard key={`my-group-${group.groupId}-${index}`} group={group} />
        ))}
      </div>

      <FloatingActionButton
        href="/groups/create"
        className="text-4xl font-extralight"
      >
        +
      </FloatingActionButton>
    </div>
  );
};
