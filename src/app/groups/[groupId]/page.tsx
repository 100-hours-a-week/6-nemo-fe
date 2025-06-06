"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SwitchGroupInfoTabs } from "@/features/group";
import { ScheduleList } from "@/widgets/schdule-list";
import { GroupMemberList, GroupPlan, useGroupById } from "@/entities/group";
import { GroupInfo } from "@/widgets/group-details";
import BackButton from "@/shared/ui/back-button";
import { useApplyToGroup } from "@/entities/group/model/use-apply-to-group";
import { toast } from "sonner";
import JSConfetti from "js-confetti";
import { ConfirmDialog } from "@/shared/ui";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  const [activeTab, setActiveTab] = useState<"info" | "schedule">("info");
  const confettiRef = useRef<JSConfetti | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // JSConfetti 인스턴스 생성
  useEffect(() => {
    confettiRef.current = new JSConfetti();
    return () => {
      confettiRef.current = null;
    };
  }, []);

  const {
    data: groupDetails,
    isLoading,
    error,
  } = useGroupById(Number(groupId));

  // 가입 신청 뮤테이션 훅 사용
  const applyMutation = useApplyToGroup(groupId);

  // 가입 신청 핸들러
  const handleApplyToGroup = async () => {
    try {
      await applyMutation.mutateAsync();

      // 성공 토스트 메시지 표시
      toast.success("모임 가입 신청이 완료되었습니다!", {
        position: "top-center",
      });

      // 컨페티 효과 추가 (5초 동안)
      if (confettiRef.current) {
        // 초기 컨페티
        confettiRef.current.addConfetti({
          confettiNumber: 200,
        });

        // 1초마다 추가 컨페티 (총 5초)
        const interval = setInterval(() => {
          if (confettiRef.current) {
            confettiRef.current.addConfetti({
              confettiNumber: 100,
            });
          }
        }, 1000);

        // 5초 후 인터벌 정리
        setTimeout(() => {
          clearInterval(interval);
        }, 3000);
      }
    } catch (error) {
      // 에러 토스트 메시지 표시
      toast.error(
        error instanceof Error
          ? error.message
          : "모임 가입 신청에 실패했습니다.",
        {
          description: "잠시 후 다시 시도해주세요.",
          position: "top-center",
        },
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !groupDetails) {
    return (
      <div className="p-ctn-lg flex h-screen w-full flex-col items-center justify-center">
        <p className="text-body-1 text-label-normal mb-4">
          모임 정보를 불러올 수 없습니다.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-primary text-common-100 rounded-full px-6 py-2"
        >
          이전 페이지로
        </button>
      </div>
    );
  }

  return (
    <div className="bg-common-100 relative flex min-h-screen flex-col pb-24">
      <BackButton
        href="/groups"
        fill={true}
        className="absolute top-4 left-4 opacity-75"
      />
      {/* 모임 상세 헤더 */}
      <GroupInfo group={groupDetails} />

      {/* 탭 메뉴 */}
      <SwitchGroupInfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 탭 내용 */}
      <div className="p-ctn-lg">
        {activeTab === "info" && (
          <div className="mt-4 space-y-6">
            {/* 모임원 섹션 */}
            <section>
              <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                모임원
              </h3>
              <GroupMemberList groupId={groupId} />
            </section>

            {/* 모임 상세 소개 */}
            <section>
              <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                모임 상세 소개
              </h3>
              <div className="bg-common-100 rounded-md p-4 shadow-xs">
                <p className="text-body-1 text-label-assistive whitespace-pre-line">
                  {groupDetails.description}
                </p>
              </div>
            </section>

            {/* 단계별 계획 */}
            {groupDetails.plan && (
              <section>
                <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                  단계별 계획
                </h3>
                <GroupPlan plan={groupDetails.plan} />
              </section>
            )}
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="py-4">
            <ScheduleList groupId={Number(groupId)} />
          </div>
        )}
      </div>

      {/* 모임 신청 확인 모달창 */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleApplyToGroup}
        title="모임 신청"
        description={`'${groupDetails.name}' 모임에 가입 신청하시겠습니까?`}
        confirmLabel="신청하기"
        cancelLabel="취소"
      />

      <button
        className="bg-primary hover:bg-primary-strong text-common-100 fixed right-0 bottom-4 left-0 mx-auto w-[calc(100%-2rem)] max-w-[calc(430px-2rem)] rounded-full py-3 font-medium shadow-lg transition"
        onClick={() => setShowConfirmDialog(true)}
        disabled={applyMutation.isPending}
      >
        {applyMutation.isPending ? "신청 처리 중..." : "모임 신청하기"}
      </button>
    </div>
  );
}
