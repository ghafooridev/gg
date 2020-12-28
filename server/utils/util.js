exports.getUiAddress = function () {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://ggchat.io";
};
