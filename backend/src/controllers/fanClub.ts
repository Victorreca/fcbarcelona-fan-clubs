import { Request, Response } from "express";
import FanClub from "../models/fanClub";

export const getFansClub = async (req: Request, res: Response) => {
  const listFanClubs = await FanClub.findAll();

  listFanClubs
    ? res.json(listFanClubs)
    : res.status(404).json({ msg: `No fan clubs` });
};

export const getFanClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fanClub = await FanClub.findByPk(id);

  fanClub
    ? res.json(fanClub)
    : res.status(404).json({ msg: `Fan club with id ${id} not found` });
};

export const deleteFanClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fanClub = await FanClub.findByPk(id);

  if (fanClub) {
    await fanClub.destroy();
    res.json({ msg: `Fan club with id ${id} deleted` });
  } else {
    res.status(404).json({ msg: `Fan club with id ${id} not found` });
  }
};

export const addFanClub = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await FanClub.create(body);

    res.json({
      msg: "Add Fan club",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Ups something went wrong",
    });
  }
};

export const updateFanClub = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const fanClub = await FanClub.findByPk(id);

    if (fanClub) {
      await fanClub?.update(body);
      res.json({
        msg: `Update Fan club with id ${id}`,
      });
    } else {
      res.status(404).json({ msg: `Fan club with id ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Ups something went wrong",
    });
  }
};
