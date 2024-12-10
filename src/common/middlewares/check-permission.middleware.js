import { ForbiddenError } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

const checkPermission = async function (req, res, next) {
  try {
    const routePath = req.route.path;
    const baseUrl = req.baseUrl;
    const method = req.method;
    const roleId = req.user.role_id;

    const fullPath = `${baseUrl}${routePath}`;

    if (roleId === 1) {
      next();
      return;
    }

    const role_permissions_exist = await prisma.role_permissions.findFirst({
      where: {
        permissions: {
          endpoint: fullPath,
          method: method,
        },
        role_id: roleId,
        is_active: true,
      },
    });

    if (!role_permissions_exist)
      throw new ForbiddenError(`User không được quyền truy cập api này`);

    console.log(fullPath, method);

    next();
  } catch (error) {
    next(error);
  }
};

export default checkPermission;
