"use client"

import * as React from "react"

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: (theme: string) => {},
})

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode
}) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme === "dark" ? "dark" : "light")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

