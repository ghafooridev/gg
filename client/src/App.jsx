import React from "react"

import { styles } from "./Style"
import "src/assets/css/style.css"
// import "./assets/scss/paper-kit.scss"
// import "./assets/demo/demo.css"
// import "./assets/scss/custom/main.scss"

import Router from "./Router"

function App() {
  styles()
  return <Router />
}

export default App
