import { Sequelize } from "sequelize";

// Sequelize
const sequelize = new Sequelize(`bd_aligo_media`, `root`, `1234`, {
    host: `localhost`,
    port: `3307`,
    dialect: `mysql`,
    // logging: false
});

export default sequelize;