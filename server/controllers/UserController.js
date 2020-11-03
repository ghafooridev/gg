const User = require("../models/User")
const Token = require("../models/Token")
const Constant = require("../utils/Constant")
const checkValidFeedback = require("../validations/User")
const { EmailActivationToken } = require("./TokenController")
const { getUiAddress } = require("../utils/util")
const userDTO = require("../dto/user")

exports.confirmationEmail = function (req, res) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) {
      return res.status(400).json(Constant.MESSAGES.INVALID_ACTIVATION_LINK)
    }

    User.findOne({ _id: token._userId, email: req.params.email }, function (
      error,
      user
    ) {
      if (!user) {
        return res.status(400).json(Constant.MESSAGES.USER_NOT_FOUND)
      }
      // user is already verified
      if (user.isVerified) {
        return res.redirect(`${getUiAddress()}/login?token=${token._userId}`)
      }
      // verify user
      user.isVerified = true
      user.save(function (err) {
        if (err) {
          return res.status(400).json(err)
        }

        return res.redirect(`${getUiAddress()}/login?token=${token._userId}`)
      })
    })
  })
}

exports.registerUser = function (req, res) {
  const { isValid } = checkValidFeedback(req.body)
  const { name, username, password, email, university, description } = req.body

  if (!isValid) {
    return res.status(422).json(Constant.ERROR.INVALID_PARAMS)
  }

  User.findOne({ email }).then((result) => {
    if (result) {
      return res.status(422).json(Constant.MESSAGES.REGISTER_DUPLICATE_EMAIL)
    }

    const newUser = {
      name,
      username,
      password,
      email,
      university,
      description,
    }

    User.create(newUser)
      .then((user) => {
        EmailActivationToken(user, req, res)
        return res.json(userDTO(user))
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })
}

exports.currentUser = function (req, res) {
  const userId = req.param("userId")

  User.findOne({ _id: userId }).then((user) => {
    if (!user) {
      return res.status(422).json(Constant.MESSAGES.USER_NOT_FOUND)
    }

    return res.json(userDTO(user))
  })
}
