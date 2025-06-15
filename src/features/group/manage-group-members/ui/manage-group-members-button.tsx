"use client";

import { toast } from "sonner";

type Props = {
  groupId: string;
  onSuccess?: () => void;
};

export const ManageGroupMembersButton = ({ groupId, onSuccess }: Props) => {
  const handleClick = () => {
    toast("모임원 관리 기능을 구현 중입니다.");
    onSuccess?.();
    // TODO: 모임원 관리 페이지로 이동
    // router.push(`/groups/${groupId}/members/manage`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-lg px-4 py-4 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
    >
      <span className="text-body-1 font-medium text-gray-900">모임원 관리</span>
    </button>
  );
};
