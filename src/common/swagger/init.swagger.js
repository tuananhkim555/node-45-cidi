import video from "./video.swagger.js";

const swaggerDocument = {
    openapi: `3.1.0`,
    info: {
        title: `Document API aligo media`,
        version: `1.0.0`,
    },
    servers: [
        {
            url: `http://localhost:3069`,
            description: `Server dưới local`,
        },
        {
            url: `https://tuananhdev.click`,
            description: `Server đã được deploy lên production`,
        },
    ],
    components: {
        securitySchemes: {
            anhToken: {
                type: `http`,
                scheme: `bearer`,
                bearerFormat: `JWT`,
            },
        },
    },
    paths: {
        ...video
    },
};
export default swaggerDocument;