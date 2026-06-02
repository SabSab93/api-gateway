import { Router } from "express";
import { prisma } from "../index";
import { authBearer } from "../middlewares/authBearer";

export const roomRouter = Router();

roomRouter.get("/", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

roomRouter.get("/:id", async (req, res) => {
  try {
    const roomId = parseInt(String(req.params.id));

    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Id invalid" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room introuvable" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

roomRouter.post("/", authBearer, async (req, res) => {
  try {
    const { name, capacity } = req.body.data;

    if (!name || capacity === undefined || capacity <= 0) {
      return res.status(400).json({
        message: "name et capacity obligatoires",
      });
    }

    const room = await prisma.room.create({
      data: {
        name,
        capacity,
      },
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

roomRouter.put("/:id", authBearer, async (req, res) => {
  try {
    const roomId = parseInt(String(req.params.id));

    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Id invalid" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        name: req.body.data.name,
        capacity: req.body.data.capacity,
      },
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

roomRouter.delete("/:id", authBearer, async (req, res) => {
  try {
    const roomId = parseInt(String(req.params.id));

    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Id invalid" });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room introuvable" });
    }

    await prisma.room.delete({
      where: { id: roomId },
    });

    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});