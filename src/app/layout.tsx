import { GA_TRACKING_ID } from "@/shared/constants";
import { Toaster } from "@/shared/ui";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { QueryProvider } from "./_providers";
import "./globals.css";

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
          <div className="mobile-container">
            {children}
            <Toaster position="top-center" />
          </div>
          <div id="modal-root"></div>
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId={`G-${GA_TRACKING_ID}`} />
    </html>
  );
}
