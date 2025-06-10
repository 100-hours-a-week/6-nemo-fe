import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "./_providers";
import AuthInterceptor from "@/features/auth/model/auth-interceptor";
import { Toaster } from "@/shared/ui";

const pretendard = localFont({
  src: "../shared/assets/fonts/PretendardVariable.woff2",
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
        <QueryProvider>
          <AuthInterceptor />
          <div className="mobile-container">
            {children}
            <Toaster position="top-center" />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
