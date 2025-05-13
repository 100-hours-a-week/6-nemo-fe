import LogoHeader from "@/shared/ui/logo-header";
import { BottomNavigation } from "@/widgets/bottom-navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LogoHeader />
      {children}
      <BottomNavigation />
    </div>
  );
}
