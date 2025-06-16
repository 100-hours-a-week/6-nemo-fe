"use client";

import { MenuItemSpinLoader, Modal } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteGroup } from "../api/use-delete-group";

type Props = {
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
};

export const DeleteGroupButton = ({ groupId, groupName, onSuccess }: Props) => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { mutate: deleteGroupMutate, isPending } = useDeleteGroup(groupId);

  const handleDeleteGroup = () => {
    deleteGroupMutate(undefined, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        className="flex w-full items-center justify-center rounded-lg px-4 py-4 text-center text-red-500 transition-colors hover:bg-red-50 active:bg-red-100"
      >
        <span className="text-body-1 font-medium">모임 삭제</span>
      </button>

      <Modal
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
        onConfirm={handleDeleteGroup}
        title="모임 삭제"
        description={`정말로 '${groupName}' 모임을 삭제하시겠습니까?`}
        confirmLabel={
          isPending ? (
            <MenuItemSpinLoader text="삭제 중..." />
          ) : (
            "삭제하기"
          )
        }
        cancelLabel="취소"
        variant="destructive"
      />
    </>
  );
};
