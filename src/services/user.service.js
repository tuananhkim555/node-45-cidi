import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const userService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
       // const [result, fields] = await pool.query("SELECT * FROM videos");
      
       let {page, pageSize} = req.query;

       console.log({page, pageSize});
 
       page = +page > 0? +page : 1; //chuỗi convert '' sang Number
       pageSize = +pageSize > 0? +pageSize : 3;
 
       const skip = (page - 1) * pageSize;
       const totalItems = await prisma.users.count();
       const totalPages = Math.ceil(totalItems / pageSize);
      // skip: (page -1) * pageSize,
 
       const users = await prisma.users.findMany({
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
         items: users || []
       };
      return `This action returns all user`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} user`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} user`;
   },
   uploadAvatar: async function (req) {
      const file = req.file;
      if(!file) throw new BadRequestError(`Không có file trong request`);

      // phân biệt hình có phải local hay không?
      const isImgLocal = req.user.avatar?.includes(`local`);

      await prisma.users.update({
         where: {
            user_id: +req.user.user_id
         },
         data: {
            avatar: file.filename,
         }
      });

      return {
         folder: `images/`,
         filename: file.filename,
         imgUrl: isImgLocal? `images${file.path}` : file.path,
      };
   }
};
