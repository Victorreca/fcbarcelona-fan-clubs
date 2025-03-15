import { DataTypes } from "sequelize";
import db from "../db/connection";

const FanClub = db.define(
  "fansclubs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    membersCount: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    foundedYear: {
      type: DataTypes.STRING(4),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [4, 4],
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

export default FanClub;
