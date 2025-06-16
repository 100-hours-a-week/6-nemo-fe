"use client";

import { delete_user } from "@/shared/assets/images";
import Image from "next/image";
import { useState } from "react";
import { MemberManagementModal } from "./member-management-modal";

type Props = {
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
};

export const ManageMembersButton = ({
  groupId,
  groupName,
  onSuccess,
}: Props) => {
  const [showManagementModal, setShowManagementModal] = useState(false);

  const handleClick = () => {
    setShowManagementModal(true);
  };

  const handleModalClose = () => {
    setShowManagementModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-4 rounded-lg px-4 py-4 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <Image
          src={delete_user}
          alt="delete user icon"
          width={20}
          height={20}
        />
        <span className="text-body-1 text-label-assistive font-medium">
          모임원 관리
        </span>
      </button>

      <MemberManagementModal
        isOpen={showManagementModal}
        onClose={handleModalClose}
        groupId={groupId}
        groupName={groupName}
      />
    </>
  );
};
