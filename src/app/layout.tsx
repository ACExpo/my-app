import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import { ThemeProvider } from "@/app/components/ThemeProvider";

// Carregando fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados
export const metadata: Metadata = {
  title: "QuizApp",
  description: "Clone estilo Quizlet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <ThemeProvider>
          {/* Sidebar fixa */}
          <Sidebar />

          {/* Conteúdo principal */}
          <main className="flex-1 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
