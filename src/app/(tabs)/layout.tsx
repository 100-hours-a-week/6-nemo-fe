import { BottomNavigation } from "@/widgets/BottomNavigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <BottomNavigation />
    </div>
  );
}
