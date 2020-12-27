const Constant = {
  ENUMS: {
    FEEDBACK_CATEGORY: [
      "Report a bug",
      "Experience Issue",
      "Business Inquiry",
      "Other",
    ],
    GAMES: {
      PICTIONARY: "PICTIONARY",
      COVIDOPOLY: "COVIDOPOLY",
      FORBIDDEN_ISLAND: "FORBIDDEN_ISLAND",
      MAFIA: "MAFIA",
    },
  },
  ACTION_TYPES: {
    SHOW_ALERT: "SHOW_ALERT",
    HIDE_ALERT: "HIDE_ALERT",
    SHOW_DIALOG: "SHOW_DIALOG",
    HIDE_DIALOG: "HIDE_DIALOG",
    LOG_IN_USER: "LOG_IN_USER",
    LOG_OUT_USER: "LOG_OUT_USER",
  },
  STORAGE: {
    CURRENT_USER: "CURRENT_USER",
    MODE: "MODE",
    CURRENT_LINK: "CURRENT_LINK",
  },
  MESSAGES: {
    SEND_ACTIVATION_LINK:
      "An activation link has been sent to your email address",
    SEND_FEEDBACK:
      "Your feedback has been sent to us ,Thanks for reporting feedback",
    RESET_PASSWORD:
      "Your password has been reset successfully,an activation link has been sent to your email address ",
    EDIT_DATA: "The information has been updated successfully",
  },
  LOGIN_PAGE: {
    SIGN_IN: "SIGN_IN",
    REGISTER: "REGISTER",
    FORGET: "FORGET",
  },
  GAMES_CONDITIONS: {
    PICTIONARY_USER: 2,
  },
};
export default Constant;
