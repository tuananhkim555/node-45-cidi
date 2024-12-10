# alpine : chỉ định phiên bản rút gọn (~5mb)
FROM node:alpine

# thiết lập đường dẫn
WORKDIR /home/app

COPY package*.json .

#5p => 5 * 60s => 5 * 60 * 1000 = 300.000ms
RUN npm install --timeout=300000

COPY . .

RUN npx prisma generate

# npm run start
CMD ["npm", "run","start"]