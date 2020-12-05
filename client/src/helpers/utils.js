export const socketURL = function () {
  if (process.env.DEBUG) {
    return "localhost:5000"
  }

  return "www.ggchat.io"
}
