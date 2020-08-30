require('dotenv').config();

let apiUrl;

if (process.env.PROD) {
  apiUrl = "";
} else {
  apiUrl = "https://ggchat.io/api"
}

module.exports = {
  apiUrl: apiUrl
};