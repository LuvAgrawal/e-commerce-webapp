const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SUPER_SECRET_JWT_KEY;

class JWT {
  //Generate Token
  generateToken(data) {
    return jwt.sign(data, key, { expiresIn: "1d" });
  }

  // Generate Refresh Token
  generateRefreshToken(data) {
    return jwt.sign(data, key, { expiresIn: "7d" });
  }

  // Verify Token
  verifyToken(req) {
    return new Promise(async (resolve, reject) => {
      let headers = req && req.headers;
      let token = headers && headers["authorization"]?.split(" ")[1];

      if (!token) {
        resolve({ status: false, message: "Token Not Found" });
      }

      try {
        jwt.verify(token, key, (err, data) => {
          if (err) {
            resolve({ status: false, message: "Invalid or expired Token" });
          }

          resolve({ status: true, data });
        });
      } catch (error) {
        reject({ status: false, message: error.message });
      }
    });
  }
}

module.exports = new JWT();
