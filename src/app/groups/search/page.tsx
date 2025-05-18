import { Suspense } from "react";
import { SearchBar } from "@/features/search/search-groups";
import { GroupList } from "@/widgets/group-list";
import BackButton from "@/shared/ui/back-button";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
  }>;
}) {
  const { keyword } = await searchParams;

  return (
    <div className="p-ctn-lg flex flex-col gap-4">
      <div className="flex items-center">
        <BackButton />
        <SearchBar className="ml-2 w-full" />
      </div>
      <Suspense
        fallback={
          <div className="py-10 text-center">검색 결과를 불러오는 중...</div>
        }
      >
        <GroupList keyword={keyword} />
      </Suspense>
    </div>
  );
}
