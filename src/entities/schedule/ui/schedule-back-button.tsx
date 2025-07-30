"use client";

import { useBackNavigation } from "@/shared/lib/use-back-navigation";
import { BackButton } from "@/shared/ui";
import { MY_SCHEDULE_PAGE, MY_SCHEDULE_PAGE_URI } from "../model/constant";

export const ScheduleBackButton = () => {
  const handleNavigateTo = useBackNavigation({
    [MY_SCHEDULE_PAGE]: MY_SCHEDULE_PAGE_URI,
  });

  return <BackButton navigateTo={handleNavigateTo} fill={false} />;
};
