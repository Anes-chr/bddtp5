import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SQL Master - Learn Database Queries",
  description: "An interactive platform to Master Bdd with lessons, flashcards, cheatsheets, and hands-on practice challenges",
  keywords: "SQL, database, queries, learning, tutorial, interactive, flashcards, cheatsheet",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-background flex flex-col">
            <MainNav />
            <main className="pt-16 flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
