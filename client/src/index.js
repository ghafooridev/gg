import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Alert from "src/components/sharedComponents/Alert"
import ThemeContextProvider from "src/Contexts/Theme"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import store from "./redux/store"
import Dialog from "./components/sharedComponents/Modal"

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <App />
      <Alert />
      <Dialog />
    </ThemeContextProvider>
  </Provider>,
  document.getElementById("root")
)
if (module.hot) {
  module.hot.accept()
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
