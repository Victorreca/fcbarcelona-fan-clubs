"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const FanClub = connection_1.default.define("fansclubs", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.DECIMAL(10, 6),
        allowNull: true,
    },
    longitude: {
        type: sequelize_1.DataTypes.DECIMAL(10, 6),
        allowNull: true,
    },
    membersCount: {
        type: sequelize_1.DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    foundedYear: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [4, 4],
        },
    },
}, {
    createdAt: false,
    updatedAt: false,
});
exports.default = FanClub;
