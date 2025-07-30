"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GroupCard } from "@/entities/group";
import { groupQuery } from "@/entities/group/api/group.query";
import { users } from "@/shared/assets/images";
import { FloatingActionButton } from "@/shared/ui";

export const MyGroupList = () => {
  const router = useRouter();

  const { data: groups, isLoading, error } = useQuery(groupQuery.myGroups());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
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
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <Image src={users} alt="유저 아이콘" width={48} height={48} />
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
    <div className="mb-16 space-y-4">
      <div className="space-y-4">
        {groups.map((group, index) => (
          <GroupCard
            key={`my-group-${group.groupId}-${index}`}
            group={group}
            from="my-group"
          />
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
