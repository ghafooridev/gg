import Constant from "../utils/Constant";
import Storage from "../services/Storage";

export const socketURL = function () {
  console.log(process.env);
  if (process.env.NODE_ENV === "development") {
    return "localhost:5000";
  }

  return "www.ggchat.io";
};

export const getUserNameFromLocalStorage = function (history) {
  const currentLink = window.location.pathname;
  const currentUser = Storage.pull(Constant.STORAGE.CURRENT_USER);
  if (currentUser) {
    return currentUser.username;
  }

  Storage.push(Constant.STORAGE.CURRENT_LINK, JSON.stringify(currentLink));

  return history.push("/login");
};
