import { SearchBar } from "@/features/search";
import { GroupsList } from "@/widgets/group-list";

export default function GroupsPage() {
  return (
    <div className="p-ctn-md flex flex-col gap-4">
      <h1 className="text-title-2 text-label-strong-2 font-semibold">
        모임 탐색
      </h1>
      <SearchBar />
      <GroupsList />
    </div>
  );
}
