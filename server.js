const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

//Use react for views
app.use(express.static(path.join(__dirname, "client", "dist")));
//Express Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Route that catches all other routes and sends the client-side React code (index.html) from the "client/dist" directory.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports = app;
