import { Request, Response } from "express";

export const getFansClub = (req: Request, res: Response) => {
  res.json({ msg: "Get Fans club" });
};

export const getFanClub = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "Get Fan club",
    id,
  });
};
export const deleteFanClub = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "Delete Fan club",
    id,
  });
};

export const addFanClub = (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    msg: "Add Fan club",
    body,
  });
};

export const updateFanClub = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  res.json({
    msg: "Update Fan club",
    id,
    body,
  });
};
