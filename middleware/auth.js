const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(decoded);

    req.body.authorId = decoded.userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = { auth };
