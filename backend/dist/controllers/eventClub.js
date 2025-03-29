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
exports.updateEventFanClub = exports.createEvent = exports.getEventById = exports.getEvents = void 0;
const eventClub_1 = __importDefault(require("../models/eventClub"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventClub_1.default.findAll();
        res.json(events);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ msg: "Error fetching events", error });
    }
});
exports.getEvents = getEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fanClubEvent = yield eventClub_1.default.findByPk(id);
        fanClubEvent
            ? res.json(fanClubEvent)
            : res.status(404).json({ msg: `Fan club Event with id ${id} not found` });
    }
    catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).json({ msg: "Error fetching fan club", error });
    }
});
exports.getEventById = getEventById;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fanclub_id, name, date, time, location } = req.body;
        if (!fanclub_id || !name || !date || !time || !location) {
            return res.status(400).json({ msg: "Todos los campos son requeridos" });
        }
        const newEvent = yield eventClub_1.default.create({
            fanclub_id,
            name,
            date,
            time,
            location,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ msg: "Error al crear el evento", error });
    }
});
exports.createEvent = createEvent;
const updateEventFanClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const eventFanClub = yield eventClub_1.default.findByPk(id);
        if (eventFanClub) {
            yield eventFanClub.update(body);
            res.json({
                msg: `Update event fan club with id ${id}`,
            });
        }
        else {
            res.status(404).json({ msg: `Event fan club with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Error updating event of Fan Club" });
    }
});
exports.updateEventFanClub = updateEventFanClub;
