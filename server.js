// Bước 1: npm init
// Bước 2: npm i express

// Reload server
// Cách 1: dùng thư viện nodemon
// Cách 2: dùng --watch của node hỗ trợ
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
import rootRouter from "./src/routes/root.router.js";
import { handleError } from "./src/common/helpers/error.helper.js";
import initSocket from "./src/common/socket/init.socket.js";
import { createServer } from "http";
import schema from "./src/common/graphql/schema.graphql.js";
import root from "./src/common/graphql/root.graphql.js";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
const app = express();
const server = createServer(app);



// sử dụng middleware chuyển JSON sang đai tượng JS (object, ...)
// sử dụng với body a
app.use(express.json());

app.use(cors({
   // origin: [`*`]
   origin: [`http://localhost:5174`, `http://localhost:5173`]
}));

// Serve static files
app.use(express.static(`.`));

// Serve the GraphiQL IDE.
app.get("/ruru", (_req, res) => {
   res.type("html")
   res.end(ruruHTML({ endpoint: "/graphql" }))
 })

// Create and use the GraphQL handler.
app.all(
   "/graphql",
   createHandler({
     schema: schema,
     rootValue: root,
   })
 )

app.use(rootRouter)



app.use(handleError);


initSocket(server);




const PORT = 3069;
server.listen(PORT, () => {
   console.log(`Server online at port ${PORT}`);
});


/**
 * PRISMA
 * B1: npx prisma init
 * B2: npx prisma db pull => kéo table vào file schema.prisma
 * B3: npx prisma generate => tạo object model
 * B4: npx prisma studio => xem dữ liệu
 */


// // 4 cách nhận dữ liệu
// /**
//  * Query Parameters
//  * Nhận biết: bắt đầu bằng dấu chấm hỏi (?) phân tách các key với nhau bằng dấu &
//  * Thường dùng: phân trang, lọc, search, ....
//  */
// app.get(`/query`, (request, respone, next) => {
//    const query = request.query;

//    console.log(query);

//    respone.json(`Query Parameters`);
// });

// /**
//  * Patch Paramerters
//  * Nhận biết: dùng /:ten_bien
//  * Thường dùng: khi muốn lấy dữ liẹu cụ thể của một đối tượng
//  */
// app.get(`/patch/:id`, (request, respone, next) => {
//    const params = request.params;

//    console.log(params);

//    respone.json(`Patch Paramerters`);
// });

// /**
//  * Body
//  * phải dùng app.use(express.json());
//  * Thường dùng: cho dữ liệu phức tạp, nhiều, lớn
//  */
// app.post(`/body`, (request, respone, next) => {
//    const body = request.body;

//    console.log(body);

//    respone.json(`body`);
// });

// /**
//  * headers
//  */
// app.get(`/headers`, (request, respone, next) => {
//    const headers = request.headers;

//    console.log({ headers });

//    respone.json(`headers`);
// });