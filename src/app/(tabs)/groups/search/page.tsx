import { Suspense } from "react";
import { SearchBar } from "@/features/search/search-groups";
import { GroupsList } from "@/widgets/group-list";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    category?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="p-ctn-md flex flex-col gap-4">
      <SearchBar />
      <Suspense
        fallback={
          <div className="py-10 text-center">검색 결과를 불러오는 중...</div>
        }
      >
        <GroupsList
          params={{
            keyword: resolvedParams.keyword,
            category: resolvedParams.category,
            size: resolvedParams.size ? parseInt(resolvedParams.size) : 10,
          }}
        />
      </Suspense>
    </div>
  );
}
