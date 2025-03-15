"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventClub = exports.FanClub = void 0;
const fanClub_1 = __importDefault(require("./fanClub"));
exports.FanClub = fanClub_1.default;
const eventClub_1 = __importDefault(require("./eventClub"));
exports.EventClub = eventClub_1.default;
fanClub_1.default.hasOne(eventClub_1.default, {
    foreignKey: "fanclub_id",
    as: "event",
});
eventClub_1.default.belongsTo(fanClub_1.default, {
    foreignKey: "fanclub_id",
    as: "fanclub",
});
