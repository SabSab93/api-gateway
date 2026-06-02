import { Router } from "express";
import { prisma } from "../index";

export const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        propositions: true,
      },
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

questionRouter.get("/:id", async (req, res) => {
    try{
        const questionId = parseInt(String(req.params.id));

        if (isNaN(questionId)) {
            return res.status(400).json({ message: "Invalid question ID" });
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: {
                propositions: true,
            },
        });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);

    }catch (error) {
    res.status(500).json({ message: "Server error" });
    }
})

questionRouter.post("/", async (req, res) => {
    try{
        const {description, qcmId} = req.body.data;

        if (!description || !qcmId) {
            return res.status(400).json({ message: "Description and qcmId are required" });
        }

        if(isNaN(qcmId)) {
            return res.status(400).json({ message: "Invalid qcm ID" });
        }

        const qcm = await prisma.qcm.findUnique({
            where: { id: qcmId },
        });

        if (!qcm) {
            return res.status(404).json({ message: "QCM not found" });
        }

        const question = await prisma.question.create({
            data: {
                description,
                qcmId,
            },
        });

        res.status(201).json(question);

    }catch (error) {
    res.status(500).json({ message: "Server error" });
    }
});

questionRouter.delete("/:id", async (req, res) => {
    try{
        const questionId = parseInt(String(req.params.id));

        if (isNaN(questionId)) {
            return res.status(400).json({ message: "Invalid question ID" });
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
        });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        await prisma.question.delete({
            where: { id: questionId },
        });

        res.status(204).json({ message: "Question deleted" });

    }catch (error) {
    res.status(500).json({ message: "Server error" });
    }
});

