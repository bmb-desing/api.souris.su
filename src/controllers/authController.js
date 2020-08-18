const User = require("../models/User");
const bcryptHelper = require("../helpers/bcryptHelper");
const JWT = require("jsonwebtoken");
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  /**
   * Авторизация
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email: email });
      if (user) {
        if (bcryptHelper.verify(password, user.password)) {
          user.rememberToken = JWT.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT,
            { expiresIn: "7d" }
          );
          await user.save();
          const token = JWT.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT,
            { expiresIn: "1h" }
          );
          user.password = undefined;
          return res.json({
            user: user,
            token: token,
          });
        } else {
          res.statusCode = 401;
          return res.json("Неправильный пароль");
        }
      } else {
        res.statusCode = 403;
        return res.json("Пользователь не найден");
      }
    } catch (err) {
      return next(err);
    }
  },
  /**
   * Обновление токена
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async updateToken(req, res, next) {
    try {
      const token = req.body.rememberToken;
      const user = await User.findOne({ rememberToken: token });
      if (!user) {
        res.statusCode = 403;
        return res.json("Ошибка авторизации");
      } else {
        const parseToken = JWT.decode(user.rememberToken);
        const tokenDate = parseToken.exp;
        const date = moment().unix();
        const unixDate = tokenDate - date;
        if (unixDate >= 0) {
          user.rememberToken = JWT.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT,
            { expiresIn: "7d" }
          );
          await user.save();
          const token = JWT.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT,
            { expiresIn: "1h" }
          );
          user.password = undefined;
          return res.json({
            user: user,
            token: token,
          });
        } else {
          res.statusCode = 401;
          return res.json("Время жизни токена истекло");
        }
      }
    } catch (err) {
      return next(err);
    }
  },
};
