const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;
const verifyPermissions = (request, response, next) => {
  // Get the token from Authorization Bearer Token Header
  const bearerToken = request.headers["authorization"];
  const userId = request.params.id;

  if (bearerToken == null) {
    response.status(401).send("401 - Unauthorize");
  } else {
    // Decode token
    const [, token] = bearerToken.split(" ");

    const { role, id } = jwt.verify(token, secret);

    if (role === "admin") { // Access provided only for admin
      next();
    } else if (userId && id == userId) { // Access provided for granted user
      next();
    } else {
      response.status(401).send("401 - Unauthorize");
    }
  }
};

module.exports = verifyPermissions;