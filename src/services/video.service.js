import { BadRequestError } from "../common/helpers/error.helper.js";
import pool from "../common/mysql2/pool.mysql2.js";
import prisma from "../common/prisma/init.prisma.js";
import videoTypeModel from "../models/video-type.model.js";

//phân trang
const videoService = {
   listVideo: async (req) => {
      //Lệnh MySql
      // const [result, fields] = await pool.query("SELECT * FROM videos");
      
      let {page, pageSize} = req.query;

      console.log({page, pageSize});

      page = +page > 0? +page : 1; //chuỗi convert '' sang Number
      pageSize = +pageSize > 0? +pageSize : 3;

      const skip = (page - 1) * pageSize;
      const totalItems = await prisma.videos.count();
      const totalPages = Math.ceil(totalItems / pageSize);
     // skip: (page -1) * pageSize,

      const videos = await prisma.videos.findMany({
        take: pageSize, //Limit
        skip: skip, //Offset

        orderBy: {
          created_at: `desc`
        }
      });

      return {
        page: page,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages,
        items: videos || []
      };
    },
    videoType: async () => { 
      // const result = await videoTypeModel.findAll();

      const result = await prisma.video_type.findMany()

      return result;
     }
}

export default videoService

