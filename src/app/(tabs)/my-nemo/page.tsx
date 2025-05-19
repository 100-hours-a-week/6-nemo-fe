"use client";

import { SwitchGroupToScheduleTabs } from "@/features/group/switch-group-to-schedule-tabs/ui/switch-group-to-schedule-tabs";
import { NoAccess } from "@/shared/ui";
import { GroupList } from "@/widgets/group-list";
import { ScheduleList } from "@/widgets/schdule-list";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"my-nemo" | "my-schedule">(
    "my-nemo",
  );
  return (
    <>
      <SwitchGroupToScheduleTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="bg-common-100 min-h-screen p-4">
        {/* {activeTab === "my-nemo" ? <GroupList /> : <ScheduleList groupId={1} />} */}
        <NoAccess contents="* 5월 21일 오픈" />
      </main>
    </>
  );
}
