"use client";

import { useAuthStore } from "@/shared/store/auth-store";
import { ConfirmDialog } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogout } from "../api/use-logout";

export const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { mutate: logoutMutate, isPending } = useLogout();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        logout(); // 로컬 상태 초기화
        router.push("/login");
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        disabled={isPending}
        className="w-full rounded-lg bg-gray-100 py-4 text-center font-medium text-gray-700 disabled:opacity-50"
      >
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </button>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleLogout}
        title="로그아웃"
        description="정말 로그아웃 하시겠습니까?"
        confirmLabel="로그아웃"
        cancelLabel="취소"
      />
    </>
  );
};
