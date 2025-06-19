const rateLimit = require("express-rate-limit");
const userModel = require("../model/userModel");
const APIResponse = require("../configs/responses");
const { verifyToken } = require("../configs/jwtConfig");

// Rate limiting configuration

class Middlewares {
  async userMiddleware(req, res, next) {
    try {
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // 5 attempts
        message: "Too many login attempts, please try again after 15 minutes",
      });

      let { status, data, message } = await verifyToken(req);
      if (status) {
        let user = await userModel.findOne({ _id: data?.id, role: "customer" });
        if (!user) {
          return res.json(
            new APIResponse(false, "Authentication Failed", null)
          );
        }
        req.data = data;
        next();
      } else {
        return res.json(new APIResponse(false, message, null));
      }
    } catch (error) {
      return res.json(new APIResponse(false, error.message, null));
    }
  }
  async adminMiddleware(req, res, next) {
    try {
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // 5 attempts
        message: "Too many login attempts, please try again after 15 minutes",
      });

      let { status, data, message } = await verifyToken(req);
      if (status) {
        let user = await userModel.findOne({ _id: data?.id, role: "admin" });
        if (!user) {
          return res.json(
            new APIResponse(false, "Authentication Failed", null)
          );
        }
        req.data = data;
        next();
      } else {
        return res.json(new APIResponse(false, message, null));
      }
    } catch (error) {
      return res.json(new APIResponse(false, error.message, null));
    }
  }
}

module.exports = new Middlewares();
