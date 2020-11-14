const Constant = {
  ENUMS: {
    FEEDBACK_CATEGORY: [
      { id: "Report a bug", value: "Report a bug" },
      { id: "Experience Issue", value: "Experience Issue" },
      { id: "Business Inquiry", value: "Business Inquiry" },
      { id: "Other", value: "Other" },
    ],
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
  },
  MESSAGES: {
    SEND_ACTIVATION_LINK:
      "An activation link has been sent to your email address",
    SEND_FEEDBACK:
      "Your feedback has been sent to us ,Thanks for reporting feedback",
    RESET_PASSWORD:
      "Your password has been reset successfully,an activation link has been sent to your email address ",
  },
  LOGIN_PAGE: {
    SIGN_IN: "SIGN_IN",
    REGISTER: "REGISTER",
    FORGET: "FORGET",
  },
  GAMES: {
    PICTIONARY_MIN_USER: 3,
  },
}
export default Constant
