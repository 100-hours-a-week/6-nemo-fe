import { GA_ID } from "@/shared/constants";
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
  title: {
    default: "네모 - NE:MO",
    template: "%s | 네모",
  },
  description: "네가 찾는 모임, 네모",
  icons: {
    icon: "/nemo_logo.svg",
  },
  openGraph: {
    title: "네모 - NE:MO",
    description: `모임을 관리하는 일이 스트레스였다면, 
                내가 원하는 모임을 어디에서 찾아야 할지 고민이었다면, 
                네가 찾는 모임, 네모`,
    images: ["/nemo_logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "네모 - NE:MO",
    description: `모임을 관리하는 일이 스트레스였다면, 
                내가 원하는 모임을 어디에서 찾아야 할지 고민이었다면, 
                네가 찾는 모임, 네모`,
    images: ["/nemo_logo.png"],
  },
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
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
