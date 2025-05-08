import { CategoryFilterBar } from "@/features/category/category-filter";
import { SearchBar } from "@/features/search/search-groups";
import { GroupList } from "@/widgets/group-list";

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="p-ctn-md space-y-2">
      <h1 className="text-title-2 text-label-strong-2 font-semibold">
        모임 탐색
      </h1>
      <SearchBar />
      <CategoryFilterBar />
      {category && category.length > 0 ? (
        <GroupList category={category} />
      ) : (
        <GroupList />
      )}
    </div>
  );
}
