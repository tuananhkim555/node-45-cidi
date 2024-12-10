import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";

const tokenService = {
    createTokens: (user) => {
        // để tăng trải nghiệm người dùng, mình sẽ làm giảm thời gian sống của accessToken xuống mức thấp nhất
        // để chứng minh người dùng đã đăng nhập thành công
        //cho nên mình sẽ cấp token khi đã xử lý logic kiểm tra email
        // => cấp token lúc login thành công

        const accessToken = jwt.sign({user_id: user.user_id}, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES,
        });
        
        // refreshToken : sẽ có nhiệm vụ bảo vệ accessToken bằng cách làm mới, bởi vì mình sẽ làm giảm thời gian sống của accessToken xuống mức thấp nhất-> khi đã giảm xuống thấp thì cần phải có refreshToken để làm mới accessToken để làm mới, nếu không có refreshToken thì accessToken thì người dùng sẽ phải đăng nhập lại
        // -  nếu hết hạn: trả về 401 logout người dùng
        // - nếu không hợp lệ (khóa bí mật) : 401 logout người dùng
        // nâng cao: refreshToken sẽ được lưu vào database

        const refreshToken = jwt.sign({user_id: user.user_id}, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRES,
        });

        return {accessToken, refreshToken};

    },
};

export default tokenService;