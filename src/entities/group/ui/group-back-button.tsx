"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { BackButton } from "@/shared/ui";
import {
  CREATE_SUCCESS_PAGE,
  MY_GROUPS_PAGE,
  MY_NEMO_PAGE,
} from "../model/constants";

export const GroupBackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const preUrl = useRef("");

  useEffect(() => {
    if (from === MY_GROUPS_PAGE) {
      preUrl.current = `${MY_NEMO_PAGE}?tab=${MY_GROUPS_PAGE}`;
    }

    if (from === CREATE_SUCCESS_PAGE) {
      preUrl.current = "/groups";
    }
  }, []);

  const handleNavigateTo = () => {
    if (preUrl.current.length > 0) {
      router.push(preUrl.current);
    } else {
      // groups 페이지에서 진입 시 스크롤 유지
      router.back();
    }
  };

  return (
    <BackButton className="opacity-75" navigateTo={handleNavigateTo} fill />
  );
};
