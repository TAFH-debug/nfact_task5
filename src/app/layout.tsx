import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
import React from "react";
import Footer from "@/app/components/footer";
import ToastProvider from "@/app/providers/ToastProvider";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Medium",
    description: "Make world brighter.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReactQueryProvider>
            <ToastProvider>
                <Header/>
                {children}
                <Footer/>
            </ToastProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
