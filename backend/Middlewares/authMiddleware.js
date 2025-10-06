const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Accès refusé : token manquant",
      });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send({
        success: false,
        message: "Format du token invalide",
      });
    }

    const token = tokenParts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Token invalide ou expiré",
    });
  }
};
