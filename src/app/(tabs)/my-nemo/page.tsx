import { MyGroupList } from "@/widgets/my-group-list";
import { MyScheduleList } from "@/widgets/my-schedule-list";
import { MY_NEMO_TAB_ITEMS } from "@/shared/constants";
import { PageTracker } from "@/shared/lib";
import { SubTab } from "@/shared/ui";

type Props = {
  searchParams: Promise<{
    tab?: "group" | "schedule";
  }>;
};

export default async function MyNemoPage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "group";

  return (
    <>
      <PageTracker pagename="my-nemo" />
      <SubTab tabs={MY_NEMO_TAB_ITEMS} activeTab={activeTab} />
      <main className="bg-background-normal min-h-screen p-4">
        {activeTab === "group" ? <MyGroupList /> : <MyScheduleList />}
      </main>
    </>
  );
}
