import { Request, Response } from "express";
import FanClub from "../models/fanClub";
import { Parser } from "json2csv";

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

export const downloadFanClubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fanClubs = await FanClub.findAll();

    if (!fanClubs.length) {
      res.status(404).json({ msg: "No hay peñas Blaugrana disponibles" });
      return;
    }

    const fields = [
      "id",
      "name",
      "location",
      "latitude",
      "longitude",
      "foundedYear",
      "membersCount",
    ];
    const json2csvParser = new Parser({ fields });
    let csvData = json2csvParser.parse(fanClubs);

    const bom = "\uFEFF";
    csvData = bom + csvData;

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("fanclubs.csv");
    res.send(csvData);
  } catch (error) {
    console.error("Error al generar CSV:", error);
    res.status(500).json({ msg: "Error al generar la descarga" });
  }
};
