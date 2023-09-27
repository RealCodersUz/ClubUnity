const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const User = require("./User"); // Adjust the path as needed
const config = require("../../shared/config");
const { hash } = require("bcryptjs");

const passwordResetTokens = {};

const sendPasswordResetEmail = (email, resetToken, userId) => {
  // Accept userId as an argument
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rsaidqodirxon@gmail.com",
      pass: "gnnt pfho nmox aksg",
    },
  });

  const resetLink = `${config.site.site_url}/reset-password/?token=${resetToken}&id=${userId}`;
  const mailOptions = {
    from: "rsaidqodirxon@gmail.com",
    to: email,
    subject: "Password Reset",
    html: `
    <h1>Assalomu Alaykum</h1>
    <p>Parolni yangilash uchun ushbu manzilga kirib yangilashingiz mumkin </p><a href="${resetLink}">${resetLink}</a>
   <div> <img src="https://realcoder.uz//assets/saidqodirxonuz-7e6d983b.jpg" /></div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = uuidv4();
    const userId = user.id.toString(); // Convert user ID to a string
    passwordResetTokens[resetToken] = userId; // Store the user ID as a string

    // Send the password reset email with userId
    sendPasswordResetEmail(email, resetToken, userId);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.query; // Correctly extract the 'token' from the query parameters
  const { password } = req.body;
  const userId = req.query.id;

  console.log(req.query);

  //   const userId = "6512e2b2d1147536c7f5a9d5"; // Replace with your actual userId

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password

    const hashedPassword = await hash(password, 10);

    user.password = hashedPassword;

    console.log(password);
    // Save the updated user
    await user.save();

    // Remove the token from the storage
    delete passwordResetTokens[token];

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error resetting password" });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
