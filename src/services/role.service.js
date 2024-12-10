import prisma from "../common/prisma/init.prisma.js";

export const roleService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      
       let {page, pageSize} = req.query;

       console.log({page, pageSize});
 
       page = +page > 0? +page : 1; //chuỗi convert '' sang Number
       pageSize = +pageSize > 0? +pageSize : 3;
 
       const skip = (page - 1) * pageSize;
       const totalItems = await prisma.roles.count();
       const totalPages = Math.ceil(totalItems / pageSize);
      // skip: (page -1) * pageSize,
 
       const roles = await prisma.roles.findMany({
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
         items: roles || []
       };
   },

   findOne: async function (req) {

      const role = await prisma.roles.findUnique({
         where: {
            role_id: +req.params.id
         }
      });

      return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async function (req) {
      const {permission_id, role_id} = req.body;

      const role_permissions_exist = await prisma.role_permissions.findFirst({
         where: {
            permission_id: permission_id,
            role_id: role_id
         },
      });

      if(role_permissions_exist) {
         // nếu tồn tại thì lật is_active lại: true thì thành false / còn false thì thành true => dùng dấu chấm than
         await prisma.role_permissions.update({
            where: {
               role_permissions_id: role_permissions_exist.role_permissions_id
            },
            data: {
               is_active: !role_permissions_exist.is_active
            }
         })
         }else{
            // nếu không tồn tại, sẽ tạo mới, is_active = true
            await prisma.role_permissions.create({
               data: {
                  permission_id: permission_id,
                  role_id: role_id,
                  is_active: true // có hoặc không có củng được vì mặc đình default không truyền là true
               },
            });
         }
         return `oke`;
      },
   };


