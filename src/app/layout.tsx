import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/src/components/ThemeProvider/ThemeProvider"

export const metadata: Metadata = {
  title: "Projeto Loja",
  description: "Loja top",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
