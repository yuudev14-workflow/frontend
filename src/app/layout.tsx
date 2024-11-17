"use client"
import localFont from "next/font/local";
import "./globals.css";


import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "@/components/header/header";

import dynamic from 'next/dynamic'
const Providers = dynamic(() => import("../components/provider/main-provider"), {ssr: false})


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("hi")
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <div className="flex-1 mt-16">
                {children}
              </div>

            </SidebarInset>

          </SidebarProvider>
        </Providers>

      </body>
    </html>


  );
}