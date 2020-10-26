const validator = require("validator")

const empty = require("lodash.isempty")

const { setToString, validationMessage } = require("./ValidatorConfig")
const Constant = require("../utils/Constant")

module.exports = (data) => {
  const error = {}
  if (validator.isEmpty(setToString(data.name))) {
    error.name = validationMessage("name", Constant.VALIDATION_TYPE.REQUIRED)
  }

  if (validator.isEmpty(setToString(data.username))) {
    error.username = validationMessage(
      "username",
      Constant.VALIDATION_TYPE.REQUIRED
    )
  }

  if (!validator.isLength(data.password, { min: 6 })) {
    error.password = validationMessage(
      "password",
      Constant.VALIDATION_TYPE.LENGTH
    )
  }

  if (validator.isEmpty(setToString(data.password))) {
    error.password = validationMessage(
      "password",
      Constant.VALIDATION_TYPE.REQUIRED
    )
  }

  if (!validator.isEmail(setToString(data.email))) {
    error.email = validationMessage("email", Constant.VALIDATION_TYPE.INVALID)
  }
  if (validator.isEmpty(setToString(data.email))) {
    error.email = validationMessage("email", Constant.VALIDATION_TYPE.REQUIRED)
  }
  console.log(error)
  return {
    error,
    isValid: empty(error),
  }
}
