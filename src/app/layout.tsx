import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider"
import { MenuLinks } from "@/components/MenuLinks/MenuLinks"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Projeto Loja TOP",
  description: "Loja TOP",
  icons: {
    icon: "/logo-s.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
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
            <Toaster />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
