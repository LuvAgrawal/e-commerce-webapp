const APIResponse = require("../configs/responses");
const userModel = require("../model/userModel");

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find().lean();
      res.status(200).json(new APIResponse(true, "All Users found", users));
    } catch (error) {
      res.status(500).json(new APIResponse(false, error.message, null));
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deleteUser = await userModel.findByIdAndDelete(req.params.id);
      console.log(deleteUser);
      if (!deleteUser) {
        return res
          .status(200)
          .json(new APIResponse(false, "User Not Found", deleteUser));
      }
      res
        .status(202)
        .json(new APIResponse(true, "User Deleted Successfully", deleteUser));
    } catch (error) {
      res
        .status(500)
        .json(new APIResponse(false, "Internal Server Error", null));
    }
  },
  updateUser: async (req, res) => {
    try {
      const { fullName, email, mobile } = req.body;
      const updateUser = await userModel.findByIdAndUpdate(
        req.params._id,
        {
          fullName: fullName,
          email: email,
          mobile: mobile,
        },
        { new: true, runValidators: true }
      );

      if (!updateUser) {
        return res
          .status(404)
          .json(new APIResponse(false, "User Not Found", null));
      }

      res
        .status(202)
        .json(new APIResponse(true, "User Updated Successfully", updateUser));
    } catch (error) {
      res
        .status(500)
        .json(new APIResponse(false, "Internal Server Error", null));
      console.log(error.message);
    }
  },
};

module.exports = adminController;
