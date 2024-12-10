import prisma from "../common/prisma/init.prisma.js";
import _ from 'lodash';

export const permissionService = {
   create: async function (req) {
    const {name, endpoint, method, module} = req.body
        console.log({name, endpoint, method, module}); 

       const newPermission = await prisma.permissions.create({
            data: {
                name: name, 
                endpoint: endpoint, 
                method: method, 
                module: module
            },
        });
    return newPermission;
   },


   findAll: async function (req) {
    let {page, pageSize} = req.query;

       console.log({page, pageSize});
 
       page = +page > 0? +page : 1; //chuỗi convert '' sang Number
       pageSize = +pageSize > 0? +pageSize : 3;
 
       const skip = (page - 1) * pageSize;
       const totalItems = await prisma.permissions.count();
       const totalPages = Math.ceil(totalItems / pageSize);
      // skip: (page -1) * pageSize,
 
       const permissions = await prisma.permissions.findMany({
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
         items: permissions || []
       };
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission `;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission `;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission `;
   },

   groupByModule: async function (req) {
    const roleId = +req.params.id;

    const permissions = await prisma.permissions.findMany({
      include: {
        role_permissions: {
            where: {
                role_id: roleId,
                is_active: true
            }
        }
      }
    })

      return _.groupBy(permissions, 'module');
   }
};
