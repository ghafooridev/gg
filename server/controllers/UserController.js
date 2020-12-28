const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const Constant = require("../utils/Constant");
const checkValidUser = require("../validations/User");
const { EmailActivationToken } = require("./TokenController");
const { getUiAddress } = require("../utils/util");
const userDTO = require("../dto/user");
const { secretOrKey } = require("../config");

exports.confirmationEmail = function (req, res) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) {
      return res.status(400).json(Constant.MESSAGES.INVALID_ACTIVATION_LINK);
    }

    User.findOne({ _id: token._userId, email: req.params.email }, function (
      error,
      user
    ) {
      if (!user) {
        return res.status(400).json(Constant.MESSAGES.USER_NOT_FOUND);
      }
      // user is already verified
      if (user.isVerified) {
        return res.redirect(`${getUiAddress()}/login?token=${token._userId}`);
      }
      // verify user
      user.isVerified = true;
      user.save(function (err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.redirect(`${getUiAddress()}/login?token=${token._userId}`);
      });
    });
  });
};

exports.registerUser = function (req, res) {
  const { isValid } = checkValidUser(req.body);
  const { name, username, password, email, university, description } = req.body;

  if (!isValid) {
    return res.status(422).json(Constant.ERROR.INVALID_PARAMS);
  }

  User.findOne({ username }).then((result) => {
    if (result) {
      return res
        .status(422)
        .json(Constant.MESSAGES.REGISTER_DUPLICATE_USERNAME);
    }

    User.findOne({ email }).then((result) => {
      if (result) {
        return res.status(422).json(Constant.MESSAGES.REGISTER_DUPLICATE_EMAIL);
      }
      const newUser = new User({
        name,
        username,
        password,
        email,
        university,
        description,
      });

      return bcrypt.genSalt(10, (e, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              EmailActivationToken("activationRegister", user, req, res);
              return res.json(userDTO(user));
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        });
      });
    });
  });
};

exports.resetPassword = function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(422).json(Constant.MESSAGES.USER_NOT_FOUND);
    }

    return bcrypt.genSalt(10, (e, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        user.password = hash;
        user.isVerified = false;
        user
          .save()
          .then((result) => {
            EmailActivationToken("activationPassword", result, req, res);
            return res.json(true);
          })
          .catch((error) => {
            res.status(400).json(error);
          });
      });
    });
  });
};

exports.loginUser = function (req, res) {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (user) {
      if (!user.isVerified) {
        return res.status(422).json(Constant.MESSAGES.NOT_VERIFIED_USER);
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            university: user.university,
          };
          jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({ token: `Bearer ${token}`, ...userDTO(user) });
          });
        } else {
          return res.status(401).json(Constant.ERROR.UNAUTHORIZED);
        }
      });
    }

    return res.status(422).json(Constant.MESSAGES.USER_NOT_FOUND);
  });
};

exports.currentUser = function (req, res) {
  const { userId } = req.params;

  User.findOne({ _id: userId }).then((user) => {
    if (!user) {
      return res.status(422).json(Constant.MESSAGES.USER_NOT_FOUND);
    }

    return res.json(userDTO(user));
  });
};

exports.allUsers = function (req, res) {
  User.find().then((users) => {
    if (!users) {
      return res.status(422).json(Constant.MESSAGES.USER_NOT_FOUND);
    }

    return res.json(users);
  });
};

exports.removeUser = function (req, res) {
  const userId = req.param("userId");

  User.findByIdAndRemove(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.editUser = function (req, res) {
  const userId = req.param("userId");
  const { username, email, university, password } = req.body;

  // id, req.body, {new: true},
  User.findByIdAndUpdate(userId, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
