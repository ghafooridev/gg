import React, { useContext, useEffect } from "react"

import "src/assets/css/style.css"
import Storage from "src/services/Storage"
import Constant from "src/utils/Constant"
import ThemeContext from "src/Contexts/Theme/ThemeContext"
import { styles } from "./Style"
import Router from "./Router"

function App() {
  const { toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const defaultTheme = Storage.pull(Constant.STORAGE.MODE)

    if (defaultTheme) {
      toggleTheme(defaultTheme)
    }
  }, [])

  styles()
  return <Router />
}

export default App
