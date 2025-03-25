"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventClub_1 = require("../controllers/eventClub");
const router = (0, express_1.Router)();
router.get("/", eventClub_1.getEvents);
exports.default = router;
