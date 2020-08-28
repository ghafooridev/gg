require('dotenv').config();

let apiUrl;

if (process.env.PROD) {
  apiUrl = "/api";
} else {
  apiUrl = "https://spielzoom.com/api"
}

module.exports = {
  apiUrl: apiUrl
};