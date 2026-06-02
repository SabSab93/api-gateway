import { Router } from "express";
import { prisma } from "../index";
import { authBearer } from "../middlewares/authBearer";

export const stayRouter = Router();

stayRouter.get("/", async (req, res) => {
  try {
    const stays = await prisma.stay.findMany({
      include: {
        room: true,
        cat: true,
      },
    });

    res.status(200).json(stays);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

stayRouter.get("/:id", async (req, res) => {
  try {
    const stayId = parseInt(String(req.params.id));

    if (isNaN(stayId)) {
      return res.status(400).json({ message: "Invalid stay ID" });
    }

    const stay = await prisma.stay.findUnique({
      where: { id: stayId },
      include: {
        room: true,
        cat: true,
      },
    });

    if (!stay) {
      return res.status(404).json({ message: "Stay not found" });
    }

    res.status(200).json(stay);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

stayRouter.post("/", authBearer, async (req, res) => {
  try {
    const { startDate, endDate, catId, roomId } = req.body.data;

    if (!startDate || !endDate || !catId || !roomId) {
      return res.status(400).json({
        message: "startDate, endDate, catId and roomId are required",
      });
    }

    const cat = await prisma.cat.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const stay = await prisma.stay.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        catId,
        roomId,
      },
      include: {
        room: true,
        cat: true,
      },
    });

    res.status(201).json(stay);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

stayRouter.put("/:id", authBearer, async (req, res) => {
  try {
    const stayId = parseInt(String(req.params.id));

    if (isNaN(stayId)) {
      return res.status(400).json({ message: "Invalid stay ID" });
    }

    const stay = await prisma.stay.findUnique({
      where: { id: stayId },
    });

    if (!stay) {
      return res.status(404).json({ message: "Stay not found" });
    }

    const { startDate, endDate, catId, roomId } = req.body.data;

    if (!startDate || !endDate || !catId || !roomId) {
      return res.status(400).json({
        message: "startDate, endDate, catId and roomId are required",
      });
    }

    const cat = await prisma.cat.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updatedStay = await prisma.stay.update({
      where: { id: stayId },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        catId,
        roomId,
      },
      include: {
        room: true,
        cat: true,
      },
    });

    res.status(200).json(updatedStay);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

stayRouter.delete("/:id", authBearer, async (req, res) => {
  try {
    const stayId = parseInt(String(req.params.id));

    if (isNaN(stayId)) {
      return res.status(400).json({ message: "Invalid stay ID" });
    }

    const stay = await prisma.stay.findUnique({
      where: { id: stayId },
    });

    if (!stay) {
      return res.status(404).json({ message: "Stay not found" });
    }

    await prisma.stay.delete({
      where: { id: stayId },
    });

    res.status(200).json({ message: "Stay deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});