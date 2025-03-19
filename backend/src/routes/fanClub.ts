import { Router } from "express";
import {
  addFanClub,
  deleteFanClub,
  downloadFanClubs,
  getFansClub,
  updateFanClub,
} from "../controllers/fanClub";
import { getFanClub } from "../controllers/fanClub";

const router = Router();

router.get("/download", downloadFanClubs);
router.get("/", getFansClub);
router.get("/:id", getFanClub);
router.delete("/:id", deleteFanClub);
router.post("/", addFanClub);
router.put("/:id", updateFanClub);

export default router;
