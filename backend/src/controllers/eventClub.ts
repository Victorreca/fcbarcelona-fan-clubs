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

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const fanClubEvent = await EventClub.findByPk(id);

    fanClubEvent
      ? res.json(fanClubEvent)
      : res.status(404).json({ msg: `Fan club Event with id ${id} not found` });
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    res.status(500).json({ msg: "Error fetching fan club", error });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { fanclub_id, name, date, time, location } = req.body;
    if (!fanclub_id || !name || !date || !time || !location) {
      return res.status(400).json({ msg: "Todos los campos son requeridos" });
    }

    const newEvent = await EventClub.create({
      fanclub_id,
      name,
      date,
      time,
      location,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ msg: "Error al crear el evento", error });
  }
};

export const updateEventFanClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const eventFanClub = await EventClub.findByPk(id);

    if (eventFanClub) {
      await eventFanClub.update(body);
      res.json({
        msg: `Update event fan club with id ${id}`,
      });
    } else {
      res.status(404).json({ msg: `Event fan club with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error updating event of Fan Club" });
  }
};

export const deleteEventFanClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventFanClub = await EventClub.findByPk(id);

  try {
    if (eventFanClub) {
      await eventFanClub.destroy();
      res.json({ msg: `Event fan club with id ${id} deleted` });
    } else {
      res.status(404).json({ msg: `Event fan club with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error deleting event", error });
  }
};
