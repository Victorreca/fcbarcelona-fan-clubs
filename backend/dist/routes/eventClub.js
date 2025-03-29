"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventClub_js_1 = require("../controllers/eventClub.js");
const router = (0, express_1.Router)();
router.get("/", eventClub_js_1.getEvents);
router.post("/", eventClub_js_1.createEvent);
router.get("/:id", eventClub_js_1.getEventById);
router.put("/:id", eventClub_js_1.updateEventFanClub);
exports.default = router;
