import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const colors = {
  brand: {
    600: "#1334ed",
    500: "#dd0af5",
    400: "#2b52ff",
  },
}

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

export const theme = extendTheme({
  colors,
  config,
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
    mono: `"Roboto Mono", monospace`,
  },
})
