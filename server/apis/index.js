const FeedbackApi = require("./Feedback")

const api = (server) => {
  server.use("/api/feedback", FeedbackApi)
}
module.exports = api
