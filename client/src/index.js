import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import store from "./redux/store"
import Alert from "./components/sharedComponents/Alert"
import Dialog from "./components/sharedComponents/Dialog"

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Alert />
    <Dialog />
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
