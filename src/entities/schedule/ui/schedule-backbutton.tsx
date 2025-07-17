"use client";

import { BackButton } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import {
  MY_NEMO_PAGE,
  MY_SCHEDULE_PAGE_PARAMS,
} from "../model/constant";

export const ScheduleBackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const preUrl = useRef("");

  if (from === MY_SCHEDULE_PAGE_PARAMS) {
    preUrl.current = `${MY_NEMO_PAGE}?tab=${MY_SCHEDULE_PAGE_PARAMS}`;
  }

  const handleNavigateTo = () => {
    if (preUrl.current.length > 0) {
      router.push(preUrl.current);
    } else {
      router.back();
    }
  };

  return <BackButton navigateTo={handleNavigateTo} fill={false} />;
};
