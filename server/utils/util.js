exports.getUiAddress = function () {
  if (process.env.DEBUG) {
    return "http://localhost:3000"
  }

  return "https://ggchat.io"
}
