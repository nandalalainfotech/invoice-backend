import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserLists from "../Models/userModel.js";
import UserRoles from "../Models/userRoleModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import config from "../config.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findOne({ email: req.body.email });
    if (user) {
      if (user?.isVerified) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            // id: user.id,
            // fName: user.firstName,
            // email: user.email,
            // // userrole: user.userRole,
            // isVerified: user.isVerified,
            id: user._id,
            email: user.email,
            isVerified: user.isVerified,
            userRoleId: user.userRoleId,
            userRoleName: user.userRoleName,
            success: true,
            token: generateToken(user),
          });
          return;
        } else {
          res.status(401).send({ message: "Your Password is Invalid" });
        }
      } else {
        res.status(401).send({ message: "Please Verify Your Email Address" });
      }
    } else {
      res.status(401).send({ message: "Invalid Email or Password" });
    }
  }),
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findOne({ email: req.body.email });
    const role = await UserRoles.findOne({ _id: "658a8b2fc5a2f629f996df15" });
    if (user) {
      res
        .status(404)
        .send({ message: "Your Email is already have been Registered" });
    } else {
      var pass = "";
      var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";
      for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }

      const user = new UserLists({
        email: req.body.email,
        password: bcrypt.hashSync(pass),
        isVerified: req.body.isVerified,
        userRoleId: role
          ? "658a8b2fc5a2f629f996df15"
          : "658a8d31c5a2f629f996df16",
        userRoleName: role ? role.roleName : "User",
      });

      const createdUser = await user.save();
      if (createdUser) {
        bcrypt.compare(
          req.body.email,
          req.body.email,
          async function (err, isMatch) {
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
            if (config.NODE_ENV == "production") {
              var mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: req.body.email,
                subject: "Invoice Registration!!",
                attachments: [
                  {
                    filename: "nandalogo.png",
                    path: "nandalogo.png",
                    cid: "nandalogo.png",
                  },
                ],
                html: `
            <!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
              <div
                style="font-family:sans-serif;font-size:14px;line-height:1.4;margin:0;padding:0;background:#f1f8f1; border-radius:20px; ">
                <div style="max-width:600px;margin:0px auto">
                  <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td>
                          <div style="max-width:600px;margin:0px auto">
                            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:20px 0;" valign="top">
                                    <div style="font-size:13px;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                      <table cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top"
                                        width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="font-size:0px;word-break:break-word;padding:5px 25px">
                                              <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="border-collapse:collapse;border-spacing:0px">
                                                <tbody>
                                                  <tr>
                                                    <th colspan="4" style="width:500px;text-align:center;">
                                                      <p
                                                        style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;margin:0 auto;text-align: center;">
            
                                                        <img src="cid:nandalogo.png" style="width:150px;height:80px;" />
                                                      </p>
                                                    </th>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;">
                  <tbody>
                    <tr>
                      <td style="font-family:sans-serif;font-size:14px" valign="top">&nbsp;</td>
                      <td
                        style="font-family:sans-serif;font-size:14px;display:block;max-width:580px;width:580px;margin:0 auto;padding:10px"
                        valign="top">
                        <div style="box-sizing:border-box;display:block;max-width:580px;margin:0 auto;padding:10px">
                          <span
                            style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">To
                            continue using Invoice Home, please click on the button below to verify your email
                            address:</span>
                          <table style="border-collapse:separate;width:100%;border-radius:10px;background:#ffffff;">
                            <tbody>
                              <tr>
                                <td style="font-family:sans-serif;font-size:14px;box-sizing:border-box;padding:20px" valign="top">
                                  <table cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
                                    <tbody>
                                      <tr>
                                        <th colspan="4" style="width:600px;text-align:center;font-size:16px;font-weight:bold;">
                                          Welcome to Nandalala Invoice
                                        </th>
                                      </tr>
                                      <tr>
                                        <td style="font-family:sans-serif;font-size:14px;margin:0 auto;color:#222222" valign="top">
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;margin:0 auto;color:#222222">
                                            Hi,
                                          </h6>
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;color:#222222">
                                            Nandalala Invoice is a time-saving tool for invoicing.
                                            Simply fill out a template with the information you need,
                                            then save, print, or email an invoice.</h6>
            
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;color:#222222">
                                            Your Password: ${pass}
                                          </h6>
            
                                          <table cellpadding="0" cellspacing="0" class="m_-6399511225032040328btn-primary"
                                            style="border-collapse:separate;width:100%;box-sizing:border-box">
                                            <tbody>
                                              <tr>
                                                <td style="font-family:sans-serif;font-size:14px;padding-bottom:15px" valign="top">
                                                  <table cellpadding="0" cellspacing="0"
                                                    style="border-collapse:separate;width:auto">
                                                    <tbody>
                                                    <tr>
                                                    <td colspan="4"
                                                      style="font-family:sans-serif;font-size:14px;border-radius:5px;width:600px;text-align:center;"
                                                      valign="top"> <a
                                                        href="${config.HOST}/verifyEmail/${createdUser._id}"
                                                        style="display:inline-block;color:#ffffff;background-color:#00A787;border-radius:5px;box-sizing:border-box;text-decoration:none;font-size:14px;font-weight:bold;margin:0;padding:5px;border:1px solid #00A787"
                                                        target="_blank"
                                                        data-saferedirecturl="${config.HOST}/verifyEmail/${createdUser._id}">
                                                        Verify</a>
                                                    </td>
                                                  </tr>
                                                      <tr>
                                                        <td colspan="4"
                                                          style="font-family:sans-serif;font-size:14px;width:600px;text-align:center;"
                                                          valign="top">
                                                          <h3
                                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0px:text-align:center;color:#00A787">
                                                            Thank
                                                            you for using InvoiceFree.in!</h3>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
            
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                      <td style="font-family:sans-serif;font-size:14px" valign="top">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            
            </body>
            
            </html>
            `,
              };
            } else {
              var mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: req.body.email,
                subject: "Invoice Registration!!",
                attachments: [
                  {
                    filename: "nandalogo.png",
                    path: "nandalogo.png",
                    cid: "nandalogo.png",
                  },
                ],
                html: `
            <!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
              <div
                style="font-family:sans-serif;font-size:14px;line-height:1.4;margin:0;padding:0;background:#f1f8f1; border-radius:20px; ">
                <div style="max-width:600px;margin:0px auto">
                  <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td>
                          <div style="max-width:600px;margin:0px auto">
                            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:20px 0;" valign="top">
                                    <div style="font-size:13px;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                      <table cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top"
                                        width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="font-size:0px;word-break:break-word;padding:5px 25px">
                                              <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="border-collapse:collapse;border-spacing:0px">
                                                <tbody>
                                                  <tr>
                                                    <th colspan="4" style="width:500px;text-align:center;">
                                                      <p
                                                        style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;margin:0 auto;text-align: center;">
            
                                                        <img src="cid:nandalogo.png" style="width:150px;height:80px;" />
                                                      </p>
                                                    </th>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;">
                  <tbody>
                    <tr>
                      <td style="font-family:sans-serif;font-size:14px" valign="top">&nbsp;</td>
                      <td
                        style="font-family:sans-serif;font-size:14px;display:block;max-width:580px;width:580px;margin:0 auto;padding:10px"
                        valign="top">
                        <div style="box-sizing:border-box;display:block;max-width:580px;margin:0 auto;padding:10px">
                          <span
                            style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">To
                            continue using Invoice Home, please click on the button below to verify your email
                            address:</span>
                          <table style="border-collapse:separate;width:100%;border-radius:10px;background:#ffffff;">
                            <tbody>
                              <tr>
                                <td style="font-family:sans-serif;font-size:14px;box-sizing:border-box;padding:20px" valign="top">
                                  <table cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
                                    <tbody>
                                      <tr>
                                        <th colspan="4" style="width:600px;text-align:center;font-size:16px;font-weight:bold;">
                                          Welcome to Nandalala Invoice
                                        </th>
                                      </tr>
                                      <tr>
                                        <td style="font-family:sans-serif;font-size:14px;margin:0 auto;color:#222222" valign="top">
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;margin:0 auto;color:#222222">
                                            Hi,
                                          </h6>
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;color:#222222">
                                            Nandalala Invoice is a time-saving tool for invoicing.
                                            Simply fill out a template with the information you need,
                                            then save, print, or email an invoice.</h6>
            
                                          <h6
                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 15px;color:#222222">
                                            Your Password: ${pass}
                                          </h6>
            
                                          <table cellpadding="0" cellspacing="0" class="m_-6399511225032040328btn-primary"
                                            style="border-collapse:separate;width:100%;box-sizing:border-box">
                                            <tbody>
                                              <tr>
                                                <td style="font-family:sans-serif;font-size:14px;padding-bottom:15px" valign="top">
                                                  <table cellpadding="0" cellspacing="0"
                                                    style="border-collapse:separate;width:auto">
                                                    <tbody>
                                                      <tr>
                                                        <td colspan="4"
                                                          style="font-family:sans-serif;font-size:14px;border-radius:5px;width:600px;text-align:center;"
                                                          valign="top"> <a
                                                            href="${config.HOST}:${config.PORT}/verifyEmail/${createdUser._id}"
                                                            style="display:inline-block;color:#ffffff;background-color:#00A787;border-radius:5px;box-sizing:border-box;text-decoration:none;font-size:14px;font-weight:bold;margin:0;padding:5px;border:1px solid #00A787"
                                                            target="_blank"
                                                            data-saferedirecturl="${config.HOST}:${config.PORT}/verifyEmail/${createdUser._id}">
                                                            Verify</a>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td colspan="4"
                                                          style="font-family:sans-serif;font-size:14px;width:600px;text-align:center;padding:0px"
                                                          valign="top">
                                                          <h3
                                                            style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0px:text-align:center;color:#00A787">
                                                            Thank
                                                            you for using InvoiceFree.in!</h3>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
            
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                      <td style="font-family:sans-serif;font-size:14px" valign="top">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            
            </body>
            
            </html>
            `,
              };
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          },
        );
      }
      res.send({
        id: createdUser._id,
        email: createdUser.email,
        isVerified: createdUser.isVerified,
        userRoleId: createdUser.userRoleId,
        userRoleName: createdUser.userRoleName,
        token: generateToken(createdUser),
      });
    }
  }),
);

userRouter.put(
  "/register/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findById({ _id: req.params.id });

    if (user) {
      user.isVerified = req.body.isVerified;
      const updateinvoice = await user.save();
      res.send({
        id: updateinvoice._id,
        email: updateinvoice.email,
        isVerified: updateinvoice.isVerified,
      });
    } else {
      res.status(404).send({ message: "Orderdetail Detail Not Found" });
    }
  }),
);

userRouter.get(
  "/getUserId/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findById({ _id: req.params.id });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }),
);

userRouter.post(
  "/checkemail",
  expressAsyncHandler(async (req, res) => {
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
          html: `<div><h1></h1><h2>Email: ${email}</h2><h2>OTP: ${otpCode}</h2></div>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          console.log("mailOptions", mailOptions);
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.send({ message: "Otp Sent Success", sentotp: otpCode, email });
      });
    } else {
      res.status(404).send({ message: "Email not found" });
    }
  }),
);

userRouter.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.findOne({ email: req.body.email });
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      const updatedUser = await user.save();
      console.log("updatedUser-------->", updatedUser);
      res.send({ message: "Updated SuccessFully" });
    }
  }),
);

userRouter.get(
  "/getUsers",
  expressAsyncHandler(async (req, res) => {
    const user = await UserLists.find();
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }),
);

export default userRouter;
