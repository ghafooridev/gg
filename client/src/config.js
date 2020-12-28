require("dotenv").config();

let apiUrl;
if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:5000/api";
} else {
  apiUrl = "https://ggchat.io/api";
}

module.exports = {
  apiUrl: "https://ghafooridev-gg.zeet.app/api",
  // apiUrl: "http://localhost:5000/api",
};
