import React from "react"

import LoginContextProvider from "./Context/index"

import Login from "./Login"

const App = function () {
  return (
    <LoginContextProvider>
      <Login />
    </LoginContextProvider>
  )
}

export default App
