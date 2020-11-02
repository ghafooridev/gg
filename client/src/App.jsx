import React from "react"

import ThemeContextProvider from "src/Contexts/Theme"
// import "./assets/css/bootstrap.min.css"
// import "./assets/scss/paper-kit.scss"
// import "./assets/demo/demo.css"
// import "./assets/scss/custom/main.scss"

import Router from "./Router"

function App() {
  return (
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  )
}

export default App
