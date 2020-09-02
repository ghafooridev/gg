require('dotenv').config();

let apiUrl;

if (!process.env.DEBUG) {
  apiUrl = "http://localhost:5000/api";
} else {
  apiUrl = "https://ggchat.io/api"
}

module.exports = {
  apiUrl: apiUrl
};