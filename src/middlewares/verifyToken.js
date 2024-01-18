import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  
  // if (!authorizationHeader) {
  //   return res.status(401).json({
  //     err: 1,
  //     msg: "Missing access token",
  //   });
  // }
  // console.log(accessToken);
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "Access token expired",
      });

    req.user = user;
    next();
  });
};

export default verifyToken;
