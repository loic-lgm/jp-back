const verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
  
    if (!bearerToken) {
      return res.status(500).send("No token");
    }
  
    const bearer = bearerToken.split(" ");
    req.token = bearer[1];
    next();
  };
  
  module.exports = verifyToken;