"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFanClub = exports.addFanClub = exports.deleteFanClub = exports.getFanClub = exports.getFansClub = void 0;
const getFansClub = (req, res) => {
    res.json({ msg: "Get Fans club" });
};
exports.getFansClub = getFansClub;
const getFanClub = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "Get Fan club",
        id,
    });
};
exports.getFanClub = getFanClub;
const deleteFanClub = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "Delete Fan club",
        id,
    });
};
exports.deleteFanClub = deleteFanClub;
const addFanClub = (req, res) => {
    const { body } = req;
    res.json({
        msg: "Add Fan club",
        body,
    });
};
exports.addFanClub = addFanClub;
const updateFanClub = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: "Update Fan club",
        id,
        body,
    });
};
exports.updateFanClub = updateFanClub;
