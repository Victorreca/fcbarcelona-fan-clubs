import { Sequelize } from "sequelize";

const sequelize = new Sequelize("fanclub_barcelona", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
