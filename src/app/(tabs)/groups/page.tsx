import { GroupList } from "@/widgets/group-list";
import { CategoryFilterBar } from "@/features/category/category-filter";
import { SearchBar } from "@/features/search/search-groups";
import { FloatingActionButton } from "@/shared/ui";
import { ScrollToTopButton } from "@/shared/ui/scroll-to-top-button";

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
        <ScrollToTopButton />
        <FloatingActionButton
          href="/groups/create"
          className="text-common-100 text-2xl"
        >
          ＋
        </FloatingActionButton>
        <GroupList category={category} />
      </main>
    </>
  );
}
