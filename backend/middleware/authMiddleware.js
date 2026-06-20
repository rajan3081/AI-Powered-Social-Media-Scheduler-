const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

  let token;

  // check token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      // get token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // save user id in request
      req.user = decoded.id;

      next();

    } catch (error) {

      res.status(401).json({
        message: "Not authorized"
      });

    }

  }

  if (!token) {

    res.status(401).json({
      message: "No token found"
    });

  }

};

module.exports = protect;