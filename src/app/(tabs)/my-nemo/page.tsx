"use client";

import { groupQuery } from "@/entities/group";
import { SwitchGroupToScheduleTabs } from "@/features/group/switch-group-to-schedule-tabs/ui/switch-group-to-schedule-tabs";
import { GroupList } from "@/widgets/group-list";
import { ScheduleList } from "@/widgets/schdule-list";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default async function Page() {
  const myGroups = useQuery(groupQuery.myGroups());
  const [activeTab, setActiveTab] = useState<"my-nemo" | "my-schedule">(
    "my-nemo"
  );
  return (
    <>
      <SwitchGroupToScheduleTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="bg-common-100 min-h-screen p-4">
        {activeTab === "my-nemo" ? <GroupList /> : <ScheduleList groupId={1} />}
      </main>
    </>
  );
}
