import Users from "../../model/UserModel.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const myProfile = await Users.findById(userId);

    if (!myProfile) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      data: myProfile,
      message: "Profile fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
