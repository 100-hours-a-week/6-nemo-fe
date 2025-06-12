import { MY_NEMO_TAB_ITEMS } from "@/shared/constants";
import { SubTab } from "@/shared/ui";
import { MyGroupList } from "@/widgets/my-group-list";
import { MyScheduleList } from "@/widgets/my-schedule-list";

type Props = {
  searchParams: Promise<{
    tab?: "group" | "schedule";
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "group";

  return (
    <>
      <SubTab tabs={MY_NEMO_TAB_ITEMS} activeTab={activeTab} />
      <main className="bg-common-100 min-h-screen p-4">
        {activeTab === "group" ? <MyGroupList /> : <MyScheduleList />}
      </main>
    </>
  );
}
