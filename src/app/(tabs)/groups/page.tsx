import { CategoryFilterBar } from "@/features/category/category-filter";
import { SearchBar } from "@/features/search/search-groups";
import { bell_bk_icon, bell_icon, nemo_logo } from "@/shared/assets/images";
import { GroupList } from "@/widgets/group-list";
import Image from "next/image";

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
      <header className="space-y-4 px-2">
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
        <SearchBar />
      </header>
      <CategoryFilterBar />
      <main className="p-ctn-md">
        {category && category.length > 0 ? (
          <GroupList category={category} />
        ) : (
          <GroupList />
        )}
      </main>
    </>
  );
}
