import express from "express";
import videoRouter from "./video.router.js";
import authRouter from "./auth.router.js";
import roleRouter from "./role.router.js";
import permissionRouter from "./permission.router.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../common/swagger/init.swagger.js";
import userRouter from "./user.router.js";


const rootRouter = express.Router();

rootRouter.use('/api-docs', swaggerUi.serve);
rootRouter.get('/api-docs', (req, res, next) => {

  const urlServer = `${req.protocol}://${req.get("host")}`;

  // console.log({ urlServer });

  swaggerDocument.servers = [
  //  ...swaggerDocument.servers,
    {
      url: urlServer,
      description: `urlServer Deploy`,
    }
  ]

  swaggerUi.setup(swaggerDocument, {swaggerOptions: {persistAuthorization: true}})(req, res, next);
});

rootRouter.get(
  `/`,
  (req, res, next) => {
   console.log(1);
   const payload = `ok`;
   req.duLieuTruyenDi = payload;
   next();
  },
  (req, res, next) => {
   console.log(2);
   req.duLieuTruyenDi += `+ 1`;
   next();
  },
  (req, res, next) => {
   console.log(3);
   req.duLieuTruyenDi += `+ 2`;
   next();
  },
  (request, respone, next) => {
    respone.json(`ok`);
  }
);

rootRouter.use("/video", videoRouter);

rootRouter.use("/auth", authRouter);

rootRouter.use("/role", roleRouter);

rootRouter.use("/permission", permissionRouter);

rootRouter.use("/user", userRouter);



export default rootRouter;
