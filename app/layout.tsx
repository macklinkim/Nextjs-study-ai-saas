import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import ProviderModal from "@/components/provider-modal";
import ToasterProvider from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Nextjs study App",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body className={inter.className}>
          <ProviderModal/>
          <ToasterProvider/>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
