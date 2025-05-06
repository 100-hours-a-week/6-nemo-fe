import { useState, useEffect } from "react";
import Image from "next/image";
import { MembersListProps, Member } from "../model/types";
import { dog, profile_icon } from "@/shared/assets/images";
import mockParticipants from "mocks/group-participants.json";

export const MembersList = ({ groupId }: MembersListProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // 실제 API 호출 코드
        // const response = await fetch(`/api/v1/groups/${groupId}/participants`);
        // const data = await response.json();
        // if (data.code === 200) {
        //   const membersList = data.data.participants.map((participant: any) => ({
        //     id: participant.userId.toString(),
        //     name: participant.nickname,
        //     role: participant.role || "member",
        //     profileImage: participant.profileImageUrl
        //   }));
        //   setMembers(membersList);
        // } else {
        //   throw new Error(data.message || "모임원 목록을 불러오는데 실패했습니다.");
        // }

        // Mock 데이터 사용
        if (mockParticipants.code === 200) {
          const membersList = mockParticipants.data.participants.map(
            (participant: any) => ({
              id: participant.userId.toString(),
              name: participant.nickname,
              role: participant.role || "member",
              profileImage: participant.profileImageUrl,
            }),
          );
          setMembers(membersList);
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
        <div key={member.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              {member.profileImage ? (
                <Image
                  src={dog}
                  alt={member.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={profile_icon}
                  alt={member.name}
                  width={16}
                  height={16}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                />
              )}
            </div>
            <span className="text-body-2 font-medium">{member.name}</span>
          </div>

          {member.role === "admin" && (
            <span className="text-caption-2 text-primary bg-primary-light rounded-full px-2 py-0.5">
              모임장
            </span>
          )}
        </div>
      ))}

      {members.length > 4 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-body-2 text-label-normal mt-2 w-full rounded-md border border-gray-200 py-2 text-center"
        >
          {isExpanded ? "접기" : "모임원 더보기"}
        </button>
      )}
    </div>
  );
};
