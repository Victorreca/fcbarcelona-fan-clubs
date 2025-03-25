import { Router } from "express";
import { getEvents } from "../controllers/eventClub";

const router = Router();

router.get("/", getEvents);

export default router;
