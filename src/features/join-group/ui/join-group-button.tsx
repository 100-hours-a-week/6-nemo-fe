"use client";

import { useConfetti } from "@/shared/lib";
import { Modal } from "@/shared/ui/modal";
import { useState } from "react";
import { useJoinGroup } from "../api/use-join-to-group";

type Props = {
  groupId: string;
  groupName: string;
};

export function JoinGroupButton({ groupId, groupName }: Props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { mutate: JoinGroupMutate, isPending } = useJoinGroup(groupId);
  const confetti = useConfetti();

  const handleJoinGroup = () => {
    JoinGroupMutate(undefined, {
      onSuccess: () => {
        confetti();
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => handleJoinGroup()}
        title="모임 신청"
        description={`'${groupName}' 모임에 가입 신청하시겠습니까?`}
        confirmLabel="신청"
        cancelLabel="취소"
      />
      <button
        className="bg-primary hover:bg-primary-strong text-common-100 fixed right-0 bottom-4 left-0 mx-auto w-[calc(100%-2rem)] max-w-[calc(430px-2rem)] rounded-full py-3 font-medium shadow-lg transition"
        onClick={() => setShowConfirmDialog(true)}
        disabled={isPending}
      >
        {isPending ? "신청 중..." : "모임 신청하기"}
      </button>
    </>
  );
}
