// The root provides a resolver function for each API endpoint
import prisma from "../../common/prisma/init.prisma.js";
const root = {
    hello() {
      return "Hello world!"
    },
    async getListVideoType() {
       const videoType = await prisma.video_type.findMany()
        return videoType;
    },
    async createVideoType(payload) {
        console.log({payload});

        const {type_name, icon} = payload;

       const videoTypeNew = await prisma.video_type.create({
            data: {
                type_name: type_name,
                icon: icon,
            }
        })

        return videoTypeNew;
    },
    async updateVideoType(payload) {
        const {type_id, type_name, icon} = payload;
        const videoTypeUpdate = await prisma.video_type.update({
            where: {
                type_id: type_id
            },
            data: {
                type_name: type_name,
                icon: icon
            }
        })
        return videoTypeUpdate;
    },
    async deleteVideoType(payload) {
        const {type_id} = payload;
        await prisma.video_type.delete({
            where: {
                type_id: type_id
            },
        });
        return `deleteVideoType`;
    }
  };

export default root;