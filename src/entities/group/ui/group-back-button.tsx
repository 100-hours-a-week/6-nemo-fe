"use client";

import { useBackNavigation } from "@/shared/lib/use-back-navigation";
import { BackButton } from "@/shared/ui";
import {
  CREATE_SUCCESS_PAGE,
  HOME_PAGE,
  MY_GROUPS_PAGE,
  MY_GROUPS_PAGE_URI,
} from "../model/constants";

export const GroupBackButton = () => {
  const handleNavigateTo = useBackNavigation({
    [MY_GROUPS_PAGE]: MY_GROUPS_PAGE_URI,
    [CREATE_SUCCESS_PAGE]: HOME_PAGE,
  });

  return (
    <BackButton className="opacity-75" navigateTo={handleNavigateTo} fill />
  );
};
