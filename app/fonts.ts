import localFont from "next/font/local"

export const methanerseFont = localFont({
  // In Next.js, we don't need to include "public" in the path as it's the default static file directory
  src: "./fonts/METHANERSE.woff2",
  variable: "--font-methanerse",
  display: "swap",
})

