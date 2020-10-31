import React from "react"

import "./assets/css/bootstrap.min.css"
import "./assets/scss/paper-kit.scss"
import "./assets/demo/demo.css"
import "./assets/scss/custom/main.scss"

import Router from "./Router"

function App() {
  return (
    // <ThemeContextProvider>
    //   <ErrorContextProvider>
    //     <SnackbarProvider maxSnack={3}>
    <Router />
    //     </SnackbarProvider>
    //   </ErrorContextProvider>
    // </ThemeContextProvider>
  )
}

export default App
