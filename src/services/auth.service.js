import { BadRequestError, UnauthorizedError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";
import { sendMail } from "../common/nodemailer/send-mail.nodemailer.js";

const authService = {
    register: async (req) => {
        //Nhận dữ liệu validate từ FE
        const {email, pass_word, full_name} = req.body;
        console.log({email, pass_word, full_name});

        //Bước 2: kiểm tra email có tồn trại trong database hay không
        //         - Nếu email đã tồn tại thì trả về lỗi "Email đã tồn tại"
        //         - Nếu email chưa tồn tại thì tiến hành tạo mới user
        // SELECT * FROM users WHERE email = "tuananhkim555@gmail.com"

        //Kiểm tra email đã tồn tại chưa
        const  userExists = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });
        if(userExists) throw new BadRequestError(`Email đã tồn tại, vui lòng sử dụng email khác`);
        console.log({userExists});

        //Bước 3: Mã hóa password
        const hashPassword = bcrypt.hashSync(pass_word, 10);

        //Bước 4: Tạo mới user người dùng mới
        const userNew = await prisma.users.create({
            data: {
                email: email,
                full_name: full_name,
                pass_word: hashPassword,
            }
        })

        await sendMail(email);

      return userNew;
    },
    login: async (req) => {
        // bước 1: nhận dữ liệu validate từ body
        const {email, pass_word} = req.body;

        console.log({email, pass_word});

        // bước 2: kiểm tra email có tồn tại trong database hay không
        // tồn tại thì đi tiếp
        // không tồn tại thì trả về lỗi "Email không tồn tại"
        
        const userExists = await prisma.users.findFirst({
            where: {
                email: email,
            },
            select: {
                user_id: true,
                // email: true,
                // full_name: true,
                pass_word: true,
            },
        });

        if(!userExists) throw new BadRequestError(`Email không tồn tại, vui lòng đăng ký`);

        // bước 3: kiểm tra password có khớp với password trong database hay không
        // sẽ không có userExists do đã ẩn đi ở src/common/prisma/init.prisma.js
        // nếu khớp thì tiến hành tạo token
        // nếu không khớp thì trả về lỗi "Mật khẩu không khớp"

        console.log({userExists});
        const passHash = userExists.pass_word; //pass trong database
        const isPassword = bcrypt.compareSync(pass_word, passHash);
        if(!isPassword) throw new BadRequestError(`Mật khẩu không chính xác`);

        // Bước 4: tạo accessToken và RefreshToken
        const tokens = tokenService.createTokens(userExists)

      return tokens;
    },

    // => LOGIN FACEBOOK
    // sau khi tạo ứng dụng fb thành công
    // Ở trang dashboard chọn Trường hợp ứng dụng
    // chọn tùy chỉnh
    // mục email => click thêm
    //lấy id ứng dụng => hoặc trên thanh url
    loginFacebook: async (req) => {
        const {email, id, name, picture} = req.body;

        console.log({email, id, name, picture});

        
        const userExists = await prisma.users.findFirst({
            where: {
                email: email,
            },
            select: {
                user_id: true,
                // email: true,
                full_name: true,
                pass_word: true,
                avatar: true,
            },
        });

       if(userExists) {
            // gom tạo 2 token ra service token
            // mang khóa bí mật ra file env
            // tạo middleware protect
            //        - tạo class lỗi UnauthorizedError
            //        - tạo class lỗi ForbiddenError
            // => send mail chào mừng với login

            // sẽ upload nếu full_name và avatar chưa có
            await prisma.users.update({
                where: {
                    user_id: userExists.user_id,
                },
                data: {
                    full_name: userExists.full_name ? undefined : name,
                    avatar: userExists.avatar ? undefined : picture.data.url
                }
            })
       }else {
            // Người dùng chưa tồn tại tạo mới
         userExists = await prisma.users.create({
                data: {
                    face_app_id: id,
                    full_name: name,
                    email: email,
                    avatar: picture.data.url
                }
            })
       }
       
       // tạo token
       const tokens = tokenService.createTokens(userExists)

       return tokens;
        
    },

    refreshToken: async (req) => {
        console.log({
            headers: req.headers
        });
        const refreshToken = req.headers?.authorization?.split(" ")[1];
        const accessToken = req.headers[`x-access-token`];

        console.log({refreshToken, accessToken});

        if(!refreshToken) throw new UnauthorizedError();
        if(!accessToken) throw new UnauthorizedError();

        const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {ignoreExpiration: true});

        if(decodedRefreshToken.user_id !== decodedAccessToken.user_id) throw new UnauthorizedError();

        const user = await prisma.users.findUnique({
            where: {
                user_id: decodedRefreshToken.user_id
            },
        });
        const tokens = tokenService.createTokens(user)


        return tokens;
    },

    getInfo: async (req) => {
        console.log({user: req.user});
        return req.user;
    }
};

export default authService;