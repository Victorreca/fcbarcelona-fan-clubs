"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFanClub = exports.addFanClub = exports.deleteFanClub = exports.getFanClub = exports.getFansClub = void 0;
const fanClub_1 = __importDefault(require("../models/fanClub"));
const getFansClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFanClubs = yield fanClub_1.default.findAll();
    listFanClubs
        ? res.json(listFanClubs)
        : res.status(404).json({ msg: `No fan clubs` });
});
exports.getFansClub = getFansClub;
const getFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fanClub = yield fanClub_1.default.findByPk(id);
    fanClub
        ? res.json(fanClub)
        : res.status(404).json({ msg: `Fan club with id ${id} not found` });
});
exports.getFanClub = getFanClub;
const deleteFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fanClub = yield fanClub_1.default.findByPk(id);
    if (fanClub) {
        yield fanClub.destroy();
        res.json({ msg: `Fan club with id ${id} deleted` });
    }
    else {
        res.status(404).json({ msg: `Fan club with id ${id} not found` });
    }
});
exports.deleteFanClub = deleteFanClub;
const addFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield fanClub_1.default.create(body);
        res.json({
            msg: "Add Fan club",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: "Ups something went wrong",
        });
    }
});
exports.addFanClub = addFanClub;
const updateFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fanClub = yield fanClub_1.default.findByPk(id);
        if (fanClub) {
            yield (fanClub === null || fanClub === void 0 ? void 0 : fanClub.update(body));
            res.json({
                msg: `Update Fan club with id ${id}`,
            });
        }
        else {
            res.status(404).json({ msg: `Fan club with id ${id} not found` });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: "Ups something went wrong",
        });
    }
});
exports.updateFanClub = updateFanClub;
