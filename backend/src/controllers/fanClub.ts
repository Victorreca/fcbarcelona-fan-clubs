import { Request, Response } from "express";
import FanClub from "../models/fanClub";
import EventClub from "../models/eventClub";
import { Parser } from "json2csv";
import "../models/associations";

export const getFansClub = async (req: Request, res: Response) => {
  try {
    const listFanClubs = await FanClub.findAll({
      include: [{ model: EventClub, as: "events" }],
    });

    listFanClubs
      ? res.json(listFanClubs)
      : res.status(404).json({ msg: `No fan clubs` });
  } catch (error) {
    console.error("Error fetching fan clubs:", error);
    res.status(500).json({ msg: "Error fetching fan clubs", error });
  }
};

export const getFanClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const fanClub = await FanClub.findByPk(id, {
      include: [{ model: EventClub, as: "events" }],
    });

    fanClub
      ? res.json(fanClub)
      : res.status(404).json({ msg: `Fan club with id ${id} not found` });
  } catch (error) {
    console.error("Error fetching fan club:", error);
    res.status(500).json({ msg: "Error fetching fan club", error });
  }
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
    const newFanClub = await FanClub.create(body);

    console.log("✅ Peña creada:", newFanClub.toJSON());
    res.status(201).json(newFanClub);
  } catch (error) {
    console.log(error);
    console.log("❌ Error al crear la peña:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const updateFanClub = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const fanClub = await FanClub.findByPk(id);

    if (fanClub) {
      await fanClub.update(body);
      res.json({
        msg: `Update Fan club with id ${id}`,
      });
    } else {
      res.status(404).json({ msg: `Fan club with id ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error updating Fan Club" });
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
