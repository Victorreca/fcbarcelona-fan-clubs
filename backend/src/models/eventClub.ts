import { DataTypes } from "sequelize";
import db from "../db/connection";
import FanClub from "./fanClub"; // Importamos FanClub para la relación

const EventClub = db.define("eventclubs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fanclub_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FanClub,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default EventClub;
