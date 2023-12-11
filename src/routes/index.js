import authRouter from "./auth";
import userRouter from "./user";

const initRouters = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRouters;
