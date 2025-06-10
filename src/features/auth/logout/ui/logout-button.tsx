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
        className="bg-primary hover:bg-primary-strong text-common-100 rounded-ctn-xs mt-4 w-full py-3 font-medium transition"
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
