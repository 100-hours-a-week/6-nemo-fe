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
    <>
      <SearchBar className="mx-4" />
      <CategoryFilterBar />
      <main className="p-ctn-lg">
        <GroupList category={category} />
      </main>
    </>
  );
}
