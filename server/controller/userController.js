const User = require("../model/userModel");
const APIResponse = require("../configs/responses");
const bcryptConfig = require("../configs/bcryptConfig");
const { generateToken, generateRefreshToken } = require("../configs/jwtConfig");
const { validationResult } = require("express-validator");

const userController = {
  registerUser: async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors?.isEmpty()) {
        return res
          ?.status(400)
          ?.json(new APIResponse(false, "Validation Error", errors.array()));
      }

      const { fullName, email, mobile, password } = req.body;

      // Check for existing user with better error handling
      const [existingUser, existingEmail] = await Promise.all([
        User.findOne({ mobile }),
        User.findOne({ email }),
      ]);

      if (existingUser || existingEmail) {
        const field = existingUser ? "mobile number" : "email";
        return res
          .status(400)
          .json(
            new APIResponse(
              false,
              `User already exists with this ${field}`,
              null
            )
          );
      }

      const hashPassword = await bcryptConfig.hashPassword(password);

      const user = await User.create({
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        mobile: mobile.trim(),
        password: hashPassword,
      });

      // Remove sensitive data before sending response
      const userResponse = user.toObject();
      delete userResponse.password;

      res
        .status(201)
        .json(new APIResponse(true, "User created successfully", userResponse));
    } catch (error) {
      console.error("Registration Error:", error);
      res
        .status(500)
        .json(new APIResponse(false, "Internal server error", null));
    }
  },

  loginUser: async (req, res) => {
    try {
      const { mobile, password } = req.body;

      // Input validation
      if (!mobile || !password) {
        return res
          .status(400)
          .json(
            new APIResponse(
              false,
              "Mobile number and password are required",
              null
            )
          );
      }

      const user = await User.findOne({mobile:mobile}).select("+password").lean();

      if (!user) {
        return res
          .status(400)
          .json(new APIResponse(false, "Invalid credentials", null));
      }

      const isMatch = await bcryptConfig.comparePassword(
        password,
        user.password
      );

      if (!isMatch) {
        return res
          .status(400)
          .json(new APIResponse(false, "Invalid credentials", null));
      }

      // Remove sensitive data
      delete user.password;

      // Generate tokens
      const accessToken = generateToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      // Update user's last login
      await User.findByIdAndUpdate(user._id, {
        lastLogin: new Date(),
        refreshToken,
      });

      res.status(200).json(
        new APIResponse(true, "Login Successful", {
          ...user,
          accessToken,
          refreshToken,
        })
      );
    } catch (error) {
      console.error("Login Error:", error);
      res
        .status(500)
        .json(new APIResponse(false, "Internal server error", null));
    }
  },
};

module.exports = { userController };
