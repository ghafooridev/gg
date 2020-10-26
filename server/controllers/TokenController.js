const crypto = require("crypto")
const Constant = require("../utils/Constant")
const Token = require("../models/Token")
const { sendMail } = require("../services/mailService/SendMail")

exports.EmailActivationToken = function (user, req, res) {
  const token = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  })

  token.save((err) => {
    if (err) {
      return res.status(500).send({ msg: err.message })
    }

    const activationMailOptions = {
      name: req.body.name,
      email: user.email,
      host: req.headers.host,
      token: token.token,
    }

    sendMail("activation", activationMailOptions)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: Constant.MESSAGES.SEND_ACTIVATION_EMAIL,
        })
      })
      .catch((error) => {
        return res.status(400).json(error)
      })
  })
}
