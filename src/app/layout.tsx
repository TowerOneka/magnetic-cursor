import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/reset.scss";
import "@/styles/globals.scss";
import "@/styles/root.scss";
import MagnetCursor from "@/components/common/MagnetCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magnetic Cursor",
  description: "Example of a magnetic cursor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MagnetCursor>{children}</MagnetCursor>
      </body>
    </html>
  );
}
