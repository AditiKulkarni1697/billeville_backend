const express = require("express");
const nodemailer = require('nodemailer');
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { orderRouter } = require("./routes/order.routes");
const { blacklistRouter } = require("./routes/blacklist.routes");
const app = express();
app.use(express.json());
app.options('*', cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.get("/", (req, res) => {
  res.send("Welcome to index page");
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: process.env.email, // Your email address
    pass: process.env.pass // Your email password or app-specific password
  }
});

app.get('/send-email', (req, res) => {
  const toEmail = req.query.email; // Get the dynamic email from the URL parameter
  const otp = req.query.otp
  console.log(toEmail,req.query,"recipient")
  // Email content
  const mailOptions = {
    from: process.env.email,
    to: toEmail,
    subject: 'Test Email Subject',
    text: `Your OTP is ${otp}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Email sending failed' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

// // Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


app.use("/user", userRouter); //register,login      // no login needed
app.use("/product", productRouter); //product get,add,update,delete  // for add,update,delete need admin login
app.use("/cart", cartRouter); // cart get,add,delete  //need regular user login
app.use("/order", orderRouter);
app.use("/blacklist", blacklistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB is connected to server");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
