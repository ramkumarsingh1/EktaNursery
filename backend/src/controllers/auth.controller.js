import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/mail.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const otpExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    const user = await User.create({
      name,
      email,
      password,
      phone,
      isEmailVerified: false,
      emailVerificationOTP: hashedOTP,
      emailVerificationExpiry: otpExpiry,
    });

    await transporter.sendMail({
    from: `"EktaNursery" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your EktaNursery Email",
    html: `
        <div style="font-family: Arial, sans-serif;">
            <h2>Welcome to EktaNursery 🌱</h2>

            <p>Your email verification OTP is:</p>

            <h1 style="letter-spacing: 8px;">
                ${otp}
            </h1>

            <p>This OTP will expire in 10 minutes.</p>

            <p>
                If you did not create this account,
                you can ignore this email.
            </p>
        </div>
    `,
});

    // Remove sensitive fields
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: createdUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validation
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            });
        }

        // OTP expired
        if (
            !user.emailVerificationExpiry ||
            user.emailVerificationExpiry < new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        // Hash entered OTP
        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        // Compare OTP
        if (hashedOTP !== user.emailVerificationOTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Verify email
        user.isEmailVerified = true;

        // Clear OTP
        user.emailVerificationOTP = "";
        user.emailVerificationExpiry = null;

        await user.save({
            validateBeforeSave: false,
        });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error("Verify Email Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Email verification failed",
        });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //Check Emailverify
    if (!user.isEmailVerified) {
    return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
        emailVerified: false,
    });
}

    // Generate Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save Refresh Token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove Sensitive Fields
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Cookie Options
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login Successful",
        user: loggedInUser,
        accessToken,
      });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};


export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logout Successful",
      });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Missing",
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Expired or Invalid",
      });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access Token Refreshed",
        accessToken,
      });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};