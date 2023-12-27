import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isVerified: user.isVerified,
      userRoleId: user.userRoleId,
      userRoleName: user.userRoleName,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    },
  );
};

export const isAuth = (req, res, next) => {
  console.log("req=====>", req);
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      },
    );
  } else {
    res.status("401").send({ message: "No Token" });
  }
};
