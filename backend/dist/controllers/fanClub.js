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
exports.downloadFanClubs = exports.updateFanClub = exports.addFanClub = exports.deleteFanClub = exports.getFanClub = exports.getFansClub = void 0;
const fanClub_1 = __importDefault(require("../models/fanClub"));
const eventClub_1 = __importDefault(require("../models/eventClub"));
const json2csv_1 = require("json2csv");
require("../models/associations");
const getFansClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listFanClubs = yield fanClub_1.default.findAll({
            include: [{ model: eventClub_1.default, as: "events" }],
        });
        listFanClubs
            ? res.json(listFanClubs)
            : res.status(404).json({ msg: `No fan clubs` });
    }
    catch (error) {
        console.error("Error fetching fan clubs:", error);
        res.status(500).json({ msg: "Error fetching fan clubs", error });
    }
});
exports.getFansClub = getFansClub;
const getFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fanClub = yield fanClub_1.default.findByPk(id, {
            include: [{ model: eventClub_1.default, as: "events" }],
        });
        fanClub
            ? res.json(fanClub)
            : res.status(404).json({ msg: `Fan club with id ${id} not found` });
    }
    catch (error) {
        console.error("Error fetching fan club:", error);
        res.status(500).json({ msg: "Error fetching fan club", error });
    }
});
exports.getFanClub = getFanClub;
const deleteFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fanClub = yield fanClub_1.default.findByPk(id);
    try {
        if (fanClub) {
            yield fanClub.destroy();
            res.json({ msg: `Fan club with id ${id} deleted` });
        }
        else {
            res.status(404).json({ msg: `Fan club with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Error deleting fanclub", error });
    }
});
exports.deleteFanClub = deleteFanClub;
const addFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newFanClub = yield fanClub_1.default.create(body);
        console.log("✅ Peña creada:", newFanClub.toJSON());
        res.status(201).json(newFanClub);
    }
    catch (error) {
        console.log(error);
        console.log("❌ Error al crear la peña:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.addFanClub = addFanClub;
const updateFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fanClub = yield fanClub_1.default.findByPk(id);
        if (fanClub) {
            yield fanClub.update(body);
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
        res.status(500).json({ msg: "Error updating Fan Club" });
    }
});
exports.updateFanClub = updateFanClub;
const downloadFanClubs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fanClubs = yield fanClub_1.default.findAll();
        if (!fanClubs.length) {
            res.status(404).json({ msg: "No hay peñas Blaugrana disponibles" });
            return;
        }
        const fields = [
            "id",
            "name",
            "location",
            "latitude",
            "longitude",
            "foundedYear",
            "membersCount",
        ];
        const json2csvParser = new json2csv_1.Parser({ fields });
        let csvData = json2csvParser.parse(fanClubs);
        const bom = "\uFEFF";
        csvData = bom + csvData;
        res.header("Content-Type", "text/csv; charset=utf-8");
        res.attachment("fanclubs.csv");
        res.send(csvData);
    }
    catch (error) {
        console.error("Error al generar CSV:", error);
        res.status(500).json({ msg: "Error al generar la descarga" });
    }
});
exports.downloadFanClubs = downloadFanClubs;
