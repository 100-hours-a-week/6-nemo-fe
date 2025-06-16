"use client";

import { delete_group } from "@/shared/assets/images";
import { MenuItemSpinLoader, Modal } from "@/shared/ui";
import Image from "next/image";
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
        className="text-delete flex w-full items-center gap-4 rounded-lg px-4 py-4 text-center transition-colors hover:bg-red-50 active:bg-red-100"
      >
        <Image
          src={delete_group}
          alt="delete group icon"
          width={20}
          height={20}
        />
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
          isPending ? <MenuItemSpinLoader text="삭제 중..." /> : "삭제하기"
        }
        cancelLabel="취소"
        variant="destructive"
      />
    </>
  );
};
