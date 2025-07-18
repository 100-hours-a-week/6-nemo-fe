import { useRouter, useSearchParams } from "next/navigation";
export function useBackNavigation(
  mapping: Record<string, string>,
  fallback?: () => void
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return () => {
    if (from && mapping[from]) {
      router.push(mapping[from]);
    } else if (fallback) {
      fallback();
    } else {
      router.back();
    }
  };
}
