require('dotenv').config();

let apiUrl;

if (process.env.PROD) {
  apiUrl = "";
} else {
  apiUrl = "http://localhost:5000"
}

module.exports = {
  apiUrl: apiUrl
};