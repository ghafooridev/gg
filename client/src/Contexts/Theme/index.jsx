import React, { useState } from "react"
import PropType from "prop-types"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Theme from "./Theme"
import ThemeContext from "./ThemeContext"

const ThemeContextProvider = (props) => {
  const { children } = props
  const [theme, setTheme] = useState({
    Theme,
  })

  const setBackGround = (type) => {
    if (type === "light") {
      return {
        paper: "#fff",
        default: "#fff",
      }
    }

    return {
      paper: theme.Theme.palette.custom.darkBlue,
      default: theme.Theme.palette.custom.bgBlue,
    }
  }

  const toggleTheme = () => {
    const newPaletteType =
      theme.Theme.palette.type === "light" ? "dark" : "light"
    setTheme({
      Theme: {
        ...theme.Theme,
        palette: {
          ...theme.Theme.palette,
          type: newPaletteType,
          background: setBackGround(newPaletteType),
        },
      },
    })
  }

  const muiTheme = createMuiTheme(theme.Theme)
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={{ toggleTheme, theme }}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropType.node.isRequired,
}
export default ThemeContextProvider
