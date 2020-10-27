module.exports = Object.freeze({
  ERROR: Object.freeze({
    UNAUTHORIZED: "Username or Password is incorrect",
    INVALID_PARAMS: "Invalid parameter",
  }),
  ENUMS: {
    FEEDBACK_CATEGORY: [
      "Report a bug",
      "Experience Issue",
      "Business Inquiry",
      "Other",
    ],
  },
  VALIDATION_TYPE: {
    INVALID: "invalid",
    REQUIRED: "required",
    LENGTH: "length",
  },
  MESSAGES: {
    INVALID_ACTIVATION_LINK:
      "Your verification link may have expired. Please click on resend for verify your Email.",
    USER_NOT_FOUND:
      "We were unable to find a user for this verification. Please SignUp",
    SEND_ACTIVATION_EMAIL:
      "A verification email has been sent to your Email. It will be expire after one day",
    REGISTER_DUPLICATE_EMAIL: "This Email address hase been taken",
  },
})
