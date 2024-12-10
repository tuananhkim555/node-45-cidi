import express from "express";
import videoController from "../controllers/video.controller.js";
import protect from "../common/middlewares/protect.middleware.js";

const videoRouter = express.Router();

// ví dụ: kiểm tra middleware ok thì cho chạy vào controller không ok thì không cho chạy vào controller
videoRouter.get(`/video-list`, videoController.listVideo //controller
);

videoRouter.use(protect); // nếu cái nào không cần bảo vệ thì đưa lên trên code này


videoRouter.get(`/video-type`, videoController.videoType);

export default videoRouter;
