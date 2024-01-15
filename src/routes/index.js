import authRouter from "./auth";
import userRouter from "./user";
import projectRouter from "./project";

const initRouters = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/project", projectRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRouters;
