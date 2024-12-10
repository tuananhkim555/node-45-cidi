const video = {
    "/video/video-list": {
        get: {
            tags: [`Videos`],
            responses: {
                200: {
                    description: `oke`,
                },
            },
        },
    },

    "/video/video-list/{id}": {
        get: {
            security: [
                { 
                    anhToken: [] 
                }],
            tags: [`Videos`],
            responses: {
                200: {
                    description: `Oke`,
                },
            },
            parameters: [
                {
                    name: `page`,
                    in: `query`,
                },
                {
                    name: `x-access-token`,
                    in: `header`,
                },
                {
                    name: `id`,
                    in: `path`,
                },
            ],
        }
    },

    "/video/video-create": {
        post: {
            security: [
                { 
                    anhToken: [] 
                }],
            tags: [`Videos`],
            responses: {
                200: {
                    description: `Oke`,
                },
            },
           requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: `object`,
                        properties: {
                            age: {type: `number`},
                            desc: {type: `string`},
                        },
                    },
                },
            },
           },
        },
    },
    "/video/video-delete": {
        delete: {
            security: [
                { 
                    anhToken: [] 
                }],
            tags: [`Videos`],
            responses: {
                200: {
                    description: `Oke`,
                },
            },
           requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: `object`,
                        properties: {
                            title: {type: `number`},
                            file: {
                                type: `file`,
                                format: `binary`,
                            },
                            file: {
                                type: `array`,
                                items: {
                                    type: `file`,
                                    format: `binary`,
                                }
                            }
                        },
                    },
                },
            },
           },
        },
    },
    "/video/video-update": {
        post: {
            security: [
                { 
                    anhToken: [] 
                }],
            tags: [`Videos`],
            responses: {
                200: {
                    description: `Oke`,
                },
            },
           requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: `object`,
                        properties: {
                            title: {type: `number`},
                            file: {
                                type: `string`,
                                format: `binary`,
                            },
                            file: {
                                type: `array`,
                                items: {
                                    type: `file`,
                                    format: `binary`,
                                }
                            }
                        },
                    },
                },
            },
           },
        },
    },
};

export default video;