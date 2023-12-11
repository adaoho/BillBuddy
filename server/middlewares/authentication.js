const { verifyToken } = require("../helpers");

function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "Unauthenticated" };

    const decoded = verifyToken(access_token);

    // console.log(decoded, "<<< this is decoded from authentication");

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
