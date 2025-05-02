import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/shared/styles/globals.css";

const pretendard = localFont({
  src: "../src/shared/assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nemo",
  description: "네가 찾는 모임, 네모",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <div className="mobile-container">
          {children}
        </div>
      </body>
    </html >
  );
}
