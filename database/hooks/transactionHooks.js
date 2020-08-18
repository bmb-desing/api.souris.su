module.exports = (schema) => {
  schema.pre("save", async function (next) {
    try {
      if (this.isNew) {
        if (this.payType) {
          let persent = 0;
          if (this.pay >= 1440) {
            persent = 20;
          } else if (this.pay >= 720) {
            persent = 10;
          } else if (this.pay >= 360) {
            persent = 5;
          }
          this.bonus = Math.ceil((this.pay / 100) * persent);
          this.user.balance += +this.pay + this.bonus;
        } else {
          this.user.balance -= this.pay;
          if (this.user.balance <= 0) {
            this.user.balance = 0;
          }
        }
        await this.user.save();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  });
};
