import authRouter from "./auth";
import userRouter from "./user";
import projectRouter from "./project";
import paymentRouter from "./payment";
import statisticsRouter from "./statistics";

const initRouters = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/project", projectRouter);
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/statistics", statisticsRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRouters;
