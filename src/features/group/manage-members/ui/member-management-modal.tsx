"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { groupQuery, Member } from "@/entities/group";
import { crown_yello, user } from "@/shared/assets/images";
import { Modal } from "@/shared/ui";
import { cn } from "lib/utils";
import { useKickMember } from "../api/use-kick-member";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
};

export const MemberManagementModal = ({
  isOpen,
  onClose,
  groupId,
  groupName,
}: Props) => {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const {
    data: members,
    isLoading,
    error,
  } = useQuery(groupQuery.members(groupId));

  const { mutate: kickMemberMutate, isPending } = useKickMember(groupId);

  const handleKickMember = () => {
    if (selectedMember) {
      kickMemberMutate(selectedMember.userId, {
        onSuccess: () => {
          setIsKickModalOpen(false);
          setSelectedMember(null);
          router.refresh();
        },
      });
    }
  };

  const handleMemberClick = (member: Member) => {
    // 모임장은 추방할 수 없음
    if (member.role === "LEADER") {
      return;
    }
    setSelectedMember(member);
    setIsKickModalOpen(true);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* 메인 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 배경 오버레이 */}
        <div
          className="absolute inset-0 bg-black opacity-30"
          onClick={onClose}
        />

        {/* 모달 내용 */}
        <div
          className="bg-common-100 relative z-10 w-[90%] max-w-sm rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-heading-2 font-semibold">모임원 관리</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className="text-body-2 text-label-normal mt-1">
              추방할 모임원을 선택합니다.
            </p>
          </div>

          {/* 모임원 목록 */}
          <div className="max-h-96 overflow-y-auto px-6 py-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            )}

            {error && (
              <p className="text-body-2 text-error py-4 text-center">
                모임원 목록을 불러오는데 실패했습니다.
              </p>
            )}

            {members && members.length === 0 && (
              <p className="text-body-2 text-label-normal py-4 text-center">
                모임원이 없습니다.
              </p>
            )}

            {members && members.length > 0 && (
              <div className="space-y-2">
                {members.map((member: Member) => (
                  <div
                    key={member.userId}
                    onClick={() => handleMemberClick(member)}
                    className={cn(
                      "flex items-center justify-between rounded-lg p-3 transition-colors",
                      member.role === "LEADER"
                        ? "cursor-not-allowed opacity-60"
                        : "hover:bg-background-normal cursor-pointer active:bg-gray-100"
                    )}
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
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-50"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-body-2 font-medium">
                          {member.nickname}
                        </span>
                        {member.role === "LEADER" && (
                          <Image
                            src={crown_yello}
                            alt="모임장"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.role === "LEADER" ? (
                        <span className="text-caption-1 text-primary bg-primary-light rounded-full px-2 py-1">
                          모임장
                        </span>
                      ) : (
                        <span className="text-caption-1 text-common-100 bg-delete rounded-full px-3 py-1 hover:bg-red-400">
                          추방
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="hover:bg-background-normal w-full rounded-md border border-gray-200 bg-white px-4 py-2 font-medium transition active:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 추방 확인 모달 */}
      <Modal
        isOpen={isKickModalOpen}
        onClose={() => {
          setIsKickModalOpen(false);
          setSelectedMember(null);
        }}
        onConfirm={handleKickMember}
        title="모임원 추방"
        description={`정말로 '${selectedMember?.nickname}'님을 '${groupName}' 모임에서 추방하시겠습니까?`}
        confirmLabel={isPending ? "추방 중..." : "추방하기"}
        cancelLabel="취소"
        variant="destructive"
      />
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};
