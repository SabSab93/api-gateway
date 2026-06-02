import { Router } from "express";
import { prisma } from "../index";
import { authBearer } from "../middlewares/authBearer";

export const catRouter = Router();

// catRouter.use(authBearer) si on souhaite proteger toute la route

catRouter.get("/", async (req,res)=> {
    try {
        const cats = await prisma.cat.findMany();
        res.json (cats)
    }
    catch (error) {
        res.status(500).json({message:"Erreur serveur"})
    }
})

catRouter.post("/", authBearer, async (req, res) => {
  try {
    const { name, age, userId } = req.body.data;

    if (!name || !userId) {
      return res.status(400).json({
        message: "Name and userId are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const cat = await prisma.cat.create({
      data: {
        name,
        age,
        userId,
      },
    });

    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


catRouter.get("/:id", async (req, res) => {
  try {
    const catId = parseInt(String(req.params.id));

    if (isNaN(catId)) {
      return res.status(400).json({ message: "Invalid cat ID" });
    }

    const cat = await prisma.cat.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }

    res.json(cat);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


catRouter.put("/:id", authBearer, async (req, res) => {
  try {
    const catId = parseInt(String(req.params.id));

    if (isNaN(catId)) {
      return res.status(400).json({ message: "Invalid cat ID" });
    }

    const cat = await prisma.cat.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }

    const { name, age, userId } = req.body.data;

    if (!name || !userId) {
      return res.status(400).json({
        message: "Name and userId are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedCat = await prisma.cat.update({
      where: { id: catId },
      data: {
        name,
        age,
        userId,
      },
    });

    res.status(200).json(updatedCat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

catRouter.delete("/:id", authBearer, async (req, res) => {
  try {
    const catId = parseInt(String(req.params.id));

    if (isNaN(catId)) {
      return res.status(400).json({ message: "Invalid cat ID" });
    }

    const cat = await prisma.cat.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }

    await prisma.cat.delete({
      where: { id: catId },
    });

    res.json({ message: "Cat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});