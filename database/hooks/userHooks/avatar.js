const sharp = require("sharp");
const axios = require("axios");
const { slugify } = require("transliteration");
module.exports = (schema) => {
  schema.pre("save", async function (next) {
    try {
      if (this.isModified("avatar") || this.isNew) {
        if (this.avatar.indexOf("http") != -1) {
          const path = await axios({
            url: this.avatar,
            responseType: "arraybuffer",
          });
          if (path.status == 200) {
            const name = slugify(this.name);
            const buffer = Buffer.from(path.data, "binary");
            await sharp(buffer)
              .toFormat("png")
              .toFile(`public/images/${name}.png`);
            this.avatar = `/images/${name}.png`;
          }
        }
      }
      return next();
    } catch (err) {
      return next(err);
    }
  });
};
