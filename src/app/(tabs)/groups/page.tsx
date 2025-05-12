import { CategoryFilterBar } from "@/features/category/category-filter";
import { SearchBar } from "@/features/search/search-groups";
import { bell_bk_icon, nemo_logo } from "@/shared/assets/images";
import LogoHeader from "@/shared/ui/logo-header";
import { GroupList } from "@/widgets/group-list";
import Image from "next/image";
import Link from "next/link";

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
      <LogoHeader>
        <SearchBar />
      </LogoHeader>
      <CategoryFilterBar />
      <main className="p-ctn-md">
        <GroupList category={category} />
      </main>
    </>
  );
}
