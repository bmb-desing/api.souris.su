const User = require("../models/User");

module.exports = {
  /**
   * Получение всех пользователей
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getAll(req, res, next) {
    try {
      const users = await User.find()
        .select(
          "avatar _id description link email name createdAt updatedAt balance payOfDay"
        )
        .limit(100)
        .skip(parseInt((req.query.page - 1) * 100 || 0))
        .sort("-createdAt");
      return res.json(users);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  /**
   * Получение одного пользователя
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getOne(req, res, next) {
    try {
      const user = await User.findOne({ link: req.params.hash })
        .select("-password")
        .populate("content");

      if (user) {
        return res.json(user);
      } else {
        res.statusCode = 404;
        return res.json("Не найдено");
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};
