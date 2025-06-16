"use client";

import { leave } from "@/shared/assets/images";
import { MenuItemSpinLoader } from "@/shared/ui";
import { Modal } from "@/shared/ui/modal";
import Image from "next/image";
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
        router.back();
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        className="text-delete flex w-full items-center gap-4 rounded-lg px-4 py-4 text-center transition-colors hover:bg-red-50 active:bg-red-100"
      >
        <Image src={leave} alt="leave icon" width={20} height={20} />
        <span className="text-body-1 font-medium">모임 탈퇴</span>
      </button>

      <Modal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleLeaveGroup}
        title="모임 탈퇴"
        description={`정말로 '${groupName}' 모임에서 탈퇴하시겠습니까?`}
        confirmLabel={
          isPending ? <MenuItemSpinLoader text="탈퇴 중..." /> : "탈퇴하기"
        }
        cancelLabel="취소"
        variant="destructive"
      />
    </>
  );
};
