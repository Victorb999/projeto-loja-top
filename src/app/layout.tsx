import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider"
import { MenuLinks } from "@/components/MenuLinks/MenuLinks"

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
          <>
            <MenuLinks />
            {children}
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
