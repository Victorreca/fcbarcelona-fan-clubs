import { Request, Response } from "express";
import EventClub from "../models/eventClub";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventClub.findAll();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ msg: "Error fetching events", error });
  }
};
