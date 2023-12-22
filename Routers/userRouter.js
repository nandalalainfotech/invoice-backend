import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import UserLists from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import config from "../config.js"

const userRouter = express.Router();


userRouter.post('/', expressAsyncHandler(async (req, res) => {
  const user = await UserLists.findOne({ email: req.body.email });
  if (user) {
    if(user?.isVerified) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          id: user.id,
          fName: user.firstName,
          email: user.email,
          userrole: user.userRole,
          isVerified: user.isVerified,
          success: true,
        });
        return;
      }
      else {
        res.status(401).send({ message: 'Your Password is Invalid' });
      }
    }
    else {
      res.status(401).send({ message: 'Please Verify Your Email Address' });
    }

  }
  else {
    res.status(401).send({ message: 'Invalid Email or Password' });
  }

}
))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
  const user = await UserLists.findOne({ email: req.body.email })
  if(user) {

    res.status(404).send({ message: 'Your Email is already have been Registered' });
  }
  else {

  var pass = "";
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

    const user = new UserLists({
      email: req.body.email,
      password: bcrypt.hashSync(pass),
      isVerified: req.body.isVerified,
    });

    console.log("node--------->env", `NODE_ENV=${config.NODE_ENV}`);

    

    const createdUser = await user.save();
    if(createdUser) {
      bcrypt.compare(req.body.email, req.body.email, async function (err, isMatch) {
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        if(config.NODE_ENV == "production") {
          var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: "Invoice Registration!!",
            html: `
            <div>
            <h1>Email Verification</h1>
            <p>please click the link below to verify your email address.</p>
            <a href="${config.HOST}/verifyEmail/${createdUser._id}">Click here</a>
  
            <h4>Your Password id ${pass} </h4>
            </div>
            `
          };
        }
        else {
          var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: "Invoice Registration!!",
            html: `
            <div>
            <h1>Email Verification</h1>
            <p>please click the link below to verify your email address.</p>
            <a href="${config.HOST}:${config.PORT}/verifyEmail/${createdUser._id}">Click here</a>
  
            <h4>Your Password id ${pass} </h4>
            </div>
            `
          };
        }

        console.log("mailOptions--->", mailOptions);
        
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        })
      })
    }
    res.send({
      id: createdUser.id,
      email: createdUser.email,
      isVerified: createdUser.isVerified
    });


    
  
  }

  
}))

userRouter.put('/register/:id', expressAsyncHandler(async (req, res) => {
  
  const user = await UserLists.findById({ _id: req.params.id })

  if (user) {
    user.isVerified = req.body.isVerified
    const updateinvoice = await user.save();
    res.send({
      id: updateinvoice._id,
      email: updateinvoice.email,
      isVerified: updateinvoice.isVerified
    });
  } else {
    res.status(404).send({ message: "Orderdetail Detail Not Found" });
  }
  
}))

userRouter.get(
  '/getUserId/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findById({ _id : req.params.id});
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post('/checkemail', expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await UserLists.findOne({ email: email });
  if (user) {
    bcrypt.compare(email, user.email, async function (err, isMatch) {
      let otpCode = Math.floor(100000 + Math.random() * 900000);
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Password Change OTP",
        html: `<div><h1></h1><h2>Email: ${email}</h2><h2>OTP: ${otpCode}</h2></div>`
      };
      transporter.sendMail(mailOptions, function (error, info) {
        console.log("mailOptions", mailOptions);
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      })
      res.send({ message: "Otp Sent Success", sentotp: otpCode, email });
    })
  } else {
    res.status(404).send({ message: 'Email not found' });
  }
}
))

userRouter.put(
  '/profile',
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findOne({ email: req.body.login.login.email });
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      const updatedUser = await user.save();
      
    }
  })
);

userRouter.get(
  '/getUsers',
  expressAsyncHandler(async (req, res) => {
 
    const user = await UserLists.find();
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


export default userRouter;