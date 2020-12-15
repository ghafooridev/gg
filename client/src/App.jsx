import React, { useContext, useEffect } from "react"

import "./assets/css/style.css"
import Storage from "./services/Storage"
import Constant from "./utils/Constant"
import ThemeContext from "./Contexts/Theme/ThemeContext"
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
