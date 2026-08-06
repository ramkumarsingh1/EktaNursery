import User from "../models/user.model.js";
import cloudinary, { uploadOnCloudinary } from "../config/cloudinary.js";
export const getUserProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        const isPasswordCorrect =
            await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = newPassword;

        user.refreshToken = "";
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const avatar = await uploadOnCloudinary(req.file.path);

    if (!avatar) {
      return res.status(500).json({
        success: false,
        message: "Avatar upload failed",
      });
    }

    const user = await User.findById(req.user._id);

    // Purani image delete karo (agar ho)
    if (user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    user.avatar = {
      url: avatar.secure_url,
      public_id: avatar.public_id,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Avatar Updated Successfully",
      avatar: user.avatar,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};