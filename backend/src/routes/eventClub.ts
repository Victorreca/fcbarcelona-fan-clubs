import { Router } from "express";
import {
  createEvent,
  getEventById,
  getEvents,
  updateEventFanClub,
} from "../controllers/eventClub.js";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEventFanClub);

export default router;
