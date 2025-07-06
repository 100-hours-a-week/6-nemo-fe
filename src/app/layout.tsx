import { Toaster } from "@/shared/ui";
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
    description: "네가 찾는 모임, 네모",
    images: ["/nemo_logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "네모 - NE:MO",
    description: "네가 찾는 모임, 네모",
    images: ["/nemo_logo.svg"],
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
    </html>
  );
}
