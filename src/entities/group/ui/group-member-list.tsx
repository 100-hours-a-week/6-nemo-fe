"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { crown_yello, user } from "@/shared/assets/images";
import { Member } from "../model/types";
import { BASE_URL } from "@/shared/constants";

export const GroupMemberList = ({ groupId }: { groupId: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/groups/${groupId}/participants`,
        );
        const data = await response.json();

        if (data.code === 200) {
          const memberList = data.data.participants.map(
            (participant: Member) => ({
              userId: participant.userId,
              nickname: participant.nickname,
              profileImageUrl: participant.profileImageUrl,
              role: participant.role,
            }),
          );
          setMembers(memberList);
        } else {
          throw new Error("모임원 목록을 불러오는데 실패했습니다.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("멤버 목록을 불러오는 중 오류 발생:", error);
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [groupId]);

  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p className="text-body-2 text-label-normal py-4">모임원이 없습니다.</p>
    );
  }

  // 표시할 멤버 수 (최대 4명, 이상 더보기 확장)
  const displayMembers = isExpanded ? members : members.slice(0, 4);

  return (
    <div className="bg-common-100 rounded-md p-4 shadow-sm">
      {displayMembers.map((member) => (
        <div
          key={member.userId}
          className="flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              {member.profileImageUrl ? (
                <Image
                  src={member.profileImageUrl}
                  alt={member.nickname}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={user}
                  alt={member.nickname}
                  width={40}
                  height={40}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                />
              )}
            </div>
            <span className="text-body-2 font-medium">{member.nickname}</span>
          </div>

          {member.role === "LEADER" && (
            <span className="text-caption-1 text-primary bg-primary-light flex items-center gap-1 rounded-full px-2 py-1">
              <Image
                src={crown_yello}
                alt={member.role}
                width={16}
                height={16}
              />
              모임장
            </span>
          )}
        </div>
      ))}

      {members.length > 4 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-label-2 text-label-normal mt-2 w-full rounded-md border border-gray-200 py-2 text-center"
        >
          {isExpanded ? "접기" : "모임원 더보기"}
        </button>
      )}
    </div>
  );
};
