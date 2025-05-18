import { CategoryFilterBar } from "@/features/category/category-filter";
import { SearchBar } from "@/features/search/search-groups";
import { FloatingActionButton } from "@/shared/ui";
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
        <FloatingActionButton
          href="/groups/create"
          className="text-4xl font-extralight"
        >
          +
        </FloatingActionButton>
        <GroupList category={category} />
      </main>
    </>
  );
}
