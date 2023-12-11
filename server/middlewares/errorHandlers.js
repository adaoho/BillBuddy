function errorHandler(error, req, res, next) {
  console.log(error, "<<< from errorHandler");
  let status = 500;
  let message = `Internal Server Error`;

  if (error.name === "Forbidden") {
    status = 403;
    message = `You aren't authorized`;
  } else if (error.name === "SequelizeValidationError") {
    const errorMsg = error.errors[0].message;
    status = 400;
    message = errorMsg;
  } else if (error.name === `emailEmpty`) {
    status = 400;
    message = `Email can't be Empty`;
  } else if (error.name === `nameEmpty`) {
    status = 400;
    message = `Name can't be Empty`;
  } else if (error.name === `passwordEmpty`) {
    status = 400;
    message = `Password can't be empty`;
  } else if (error.name === "InvalidLogin") {
    status = 401;
    message = `Invalid email/password`;
  } else if (error.name === "InvalidId") {
    status = 404;
    message = `Error Data Not Found`;
  } else if (error.name === "InvalidRole") {
    status = 403;
    message = `Role Invalid`;
  } else if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = `Email Already Registered`;
  } else if (error.name === "BookmarkCreated") {
    status = 400;
    message = `Bookmark Already Created`;
  } else if (error.name === "JsonWebTokenError") {
    status = 401;
    message = `Account Token Invalid`;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
