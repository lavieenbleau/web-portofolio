import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { Navbar } from "@/components/navbar/navbar";
import { LoadingScreen } from "@/components/loader/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faisal Anugrah | Creative Designer | Web Developer | Web Designer",
  description: "Portfolio of Faisal Anugrah, a Creative Designer, Web Developer, and Web Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            <LoadingScreen />
            <ScrollProgress />
            <Navbar />
            <main className="relative min-h-screen z-10">{children}</main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
