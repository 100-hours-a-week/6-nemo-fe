"use client";

import { SwitchGroupToScheduleTabs } from "@/features/group/switch-group-to-schedule-tabs/ui/switch-group-to-schedule-tabs";
import { bell_bk_icon, nemo_logo } from "@/shared/assets/images";
import { GroupList } from "@/widgets/group-list";
import { ScheduleList } from "@/widgets/schdule-list";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"my-nemo" | "my-schedule">(
    "my-nemo",
  );
  return (
    <>
      <header className="bg-common-100 space-y-4 px-2">
        <div className="flex justify-between px-4 pt-6">
          <Image
            src={nemo_logo}
            alt="logo"
            width={64}
            height={64}
            className="object-contain opacity-60"
          />
          <Image
            src={bell_bk_icon}
            alt="검색"
            width={18}
            height={18}
            className="object-contain opacity-60"
          />
        </div>
        <SwitchGroupToScheduleTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </header>
      <main className="bg-common-100 min-h-screen p-4">
        {activeTab === "my-nemo" ? <GroupList /> : <ScheduleList groupId={1} />}
      </main>
    </>
  );
}
