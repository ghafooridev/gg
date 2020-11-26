import React, { useState } from "react"
import PropType from "prop-types"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Storage from "src/services/Storage"
import Constant from "src/utils/Constant"
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

  const toggleTheme = (defaultTheme) => {
    if (defaultTheme) {
      return setTheme({
        Theme: {
          ...theme.Theme,
          palette: {
            ...theme.Theme.palette,
            type: defaultTheme,
            background: setBackGround(defaultTheme),
          },
        },
      })
    }
    const newPaletteType =
      theme.Theme.palette.type === "light" ? "dark" : "light"

    Storage.push(Constant.STORAGE.MODE, JSON.stringify(newPaletteType))

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
