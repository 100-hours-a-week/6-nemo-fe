export function MenuItemSpinLoader({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
      <span>변경 중...</span>
    </div>
  );
}
