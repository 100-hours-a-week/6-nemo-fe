"use client";

import { useConfetti } from "@/shared/lib";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useJoinGroup } from "../api/use-join-to-group";

type Props = {
  groupId: string;
  groupName: string;
  role: "LEADER" | "MEMBER" | "NON_MEMBER" | "GUEST";
};

const DynamicModal = dynamic(
  () => import("@/shared/ui/modal").then((mod) => ({ default: mod.Modal })),
  {
    ssr: false,
  }
);

export function JoinGroupButton({ groupId, groupName, role }: Props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { mutate: JoinGroupMutate, isPending } = useJoinGroup(groupId);
  const confetti = useConfetti();
  console.log(role);

  const handleJoinGroup = () => {
    JoinGroupMutate(undefined, {
      onSuccess: () => {
        confetti();
      },
    });
  };

  // 모임장
  if (role === "LEADER" || !role) {
    return null;
  }

  // 모임원
  if (role === "MEMBER") {
    return (
      <button
        className="rounded-ctn-md fixed right-0 bottom-4 left-0 mx-auto w-[calc(100%-2rem)] max-w-[calc(430px-2rem)] cursor-not-allowed bg-gray-100 py-3 font-medium text-gray-500 opacity-90 shadow-lg"
        disabled={true}
      >
        가입 완료
      </button>
    );
  }

  // 모임원이 아닌 유저 & 비로그인 유저
  if (role === "NON_MEMBER" || role === "GUEST")
    return (
      <>
        <DynamicModal
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={() => handleJoinGroup()}
          title="모임 신청"
          description={`'${groupName}' 모임에 가입 신청하시겠습니까?`}
          confirmLabel="신청"
          cancelLabel="취소"
        />
        <button
          className="bg-primary hover:bg-primary-strong text-common-100 rounded-ctn-md fixed right-0 bottom-4 left-0 mx-auto w-[calc(100%-2rem)] max-w-[calc(430px-2rem)] py-3 font-medium shadow-lg transition"
          onClick={() => setShowConfirmDialog(true)}
          disabled={isPending}
        >
          {isPending ? "신청 중..." : "모임 신청하기"}
        </button>
      </>
    );
}
