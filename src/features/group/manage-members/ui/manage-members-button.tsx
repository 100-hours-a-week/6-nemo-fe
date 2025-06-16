"use client";

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
        className="flex w-full items-center justify-center rounded-lg px-4 py-4 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <span className="text-body-1 font-medium text-gray-900">
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
