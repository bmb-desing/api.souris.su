const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const helmet = require("helmet");
const compression = require("compression");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const responseTime = require("response-time");
const morgan = require("morgan");

const logger = require("../config/logger");
const router = require("./router/index");
const passport = require("./middleware/passport");

dotenv.config();

const app = express();

//app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(responseTime());
app.use(morgan("combined", { stream: logger.stream }));
app.use("/", router);

if (process.env.NODE_ENV !== "production") {
  // only use in development
  app.use(errorhandler());
  require("../database/seeder/index")();
}

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на ${process.env.PORT} порту`);
});
