// set up plain http server
const express = require("express")

const app = express()
const http = require("http")

const server = http.createServer(app)

// set up a route to redirect http to https
app.get("*", function (req, res) {
  res.redirect(`https://${req.headers.host}${req.url}`)
})

// have it listen on 80
server.listen(80)
