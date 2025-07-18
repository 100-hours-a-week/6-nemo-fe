"use client";

import JSConfetti from "js-confetti";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { party } from "@/shared/assets/images";
import { Button } from "@/shared/ui/button";

// useSearchParams를 사용하는 컴포넌트 임시 분리
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const containerRef = useRef(null);

  useEffect(() => {
    const confettiInstance = new JSConfetti();

    confettiInstance.addConfetti({
      confettiNumber: 200,
    });

    const interval = setInterval(() => {
      confettiInstance.addConfetti({
        confettiNumber: 200,
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleGoToGroup = () => {
    if (groupId) {
      router.push(`/groups/${groupId}?from=success`);
    } else {
      router.push("/groups");
    }
  };

  return (
    <div
      ref={containerRef}
      className="from-primary-light/30 to-common-100 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4"
    >
      <div className="bg-primary-light mx-auto mb-6 flex items-center justify-center rounded-full">
        <Image src={party} alt="성공" width={160} height={160} />
      </div>
      <h1 className="text-title-3 mb-2 font-bold text-gray-800">
        모임 생성을 축하합니다!
      </h1>
      <p className="text-body-1 mb-8 text-center text-gray-600">
        새로운 모임이 성공적으로 생성되었습니다. <br />
        멋진 모임 활동을 시작해보세요!
      </p>
      <Button
        onClick={handleGoToGroup}
        className="bg-primary w-full max-w-sm py-6 text-lg font-medium text-white"
      >
        모임 보러가기
      </Button>
    </div>
  );
}

export default function CreateSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="from-primary-light/30 to-common-100 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-body-1 mt-4 text-gray-600">로딩 중...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
