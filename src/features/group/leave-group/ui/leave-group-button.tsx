"use client";

import { Modal } from "@/shared/ui/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLeaveGroup } from "../api/use-leave-group";

type Props = {
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
};

export const LeaveGroupButton = ({ groupId, groupName, onSuccess }: Props) => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { mutate: leaveGroupMutate, isPending } = useLeaveGroup(groupId);

  const handleLeaveGroup = () => {
    leaveGroupMutate(undefined, {
      onSuccess: () => {
        onSuccess?.();
        router.push("/groups");
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        className="flex w-full items-center justify-center rounded-lg px-4 py-4 text-center text-red-500 transition-colors hover:bg-red-50 active:bg-red-100"
      >
        <span className="text-body-1 font-medium">모임 탈퇴</span>
      </button>

      <Modal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleLeaveGroup}
        title="모임 탈퇴"
        description={`정말로 '${groupName}' 모임에서 탈퇴하시겠습니까?`}
        confirmLabel={isPending ? "탈퇴 중..." : "탈퇴하기"}
        cancelLabel="취소"
        variant="destructive"
      />
    </>
  );
};
