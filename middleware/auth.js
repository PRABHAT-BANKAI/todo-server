const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if token is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || !decoded.userData || !decoded.userData._id) {
      return res.status(401).json({ message: "Invalid token data" });
    }

    // ✅ Attach user data safely to the request (don’t mutate req.body)
    req.user = {
      authorId: decoded.userData._id,
      email: decoded.userData.email, // optional, if available
      name: decoded.userData.userName,   // optional
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = { auth };
