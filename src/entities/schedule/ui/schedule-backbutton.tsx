"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { BackButton } from "@/shared/ui";
import { MY_NEMO_PAGE, MY_SCHEDULE_PAGE } from "../model/constant";

export const ScheduleBackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const preUrl = useRef("");

  useEffect(() => {
    if (from === MY_SCHEDULE_PAGE) {
      preUrl.current = `${MY_NEMO_PAGE}?tab=${MY_SCHEDULE_PAGE}`;
    }
  }, []);

  const handleNavigateTo = () => {
    if (preUrl.current.length > 0) {
      router.push(preUrl.current);
    } else {
      router.back();
    }
  };

  return <BackButton navigateTo={handleNavigateTo} fill={false} />;
};
