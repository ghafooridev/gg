require('dotenv').config();

let apiUrl;

if (process.env.PROD) {
  apiUrl = "/api";
} else {
  apiUrl = "https://ggchat.io/api"
}

module.exports = {
  apiUrl: apiUrl
};