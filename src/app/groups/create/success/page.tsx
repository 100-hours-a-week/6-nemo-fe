"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { party } from "@/shared/assets/images";
import JSConfetti from "js-confetti";
// import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const containerRef = useRef(null);
  // const { width, height } = useWindowSize();

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
      router.push(`/groups/${groupId}`);
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
      {/* <Confetti width={430} height={929} /> */}
      <Button
        onClick={handleGoToGroup}
        className="bg-primary w-full max-w-sm py-6 text-lg font-medium text-white"
      >
        모임 보러가기
      </Button>
    </div>
  );
}
