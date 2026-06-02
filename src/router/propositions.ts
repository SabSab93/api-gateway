import {prisma} from "../index";
import { Router } from "express";

export const propositionRouter = Router();

propositionRouter.get("/", async (req, res) => {
    try{
        const propositions = await prisma.proposition.findMany();
        res.status(200).json(propositions); 

    }catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
})

propositionRouter.get("/:id", async (req, res) => {
    try{
        const propositionId = parseInt(String(req.params.id));

        if (isNaN(propositionId)) {
            return res.status(400).json({ message: "Invalid proposition ID" });
        }

        const proposition = await prisma.proposition.findUnique({
            where: { id: propositionId },
        });

        if (!proposition) {
            return res.status(404).json({ message: "Proposition not found" });
        }

        res.status(200).json(proposition);

    }catch (error) {
    res.status(500).json({ message: "Server error" });
    }
})

propositionRouter.post("/", async (req, res) => {
    try{
        const { description, isValid, questionId } = req.body.data;

        if (!description || isValid === undefined || !questionId) {
            return res.status(400).json({ message: "Description, isValid and questionId are required" });
        }

        if(isNaN(questionId)) {
            return res.status(400).json({ message: "Invalid question ID" });
        }
        const question = await prisma.question.findUnique({
            where: { id: questionId },
        });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const proposition = await prisma.proposition.create({
            data: {
                description,
                isValid,
                questionId,
            },
        });

        res.status(201).json(proposition);

    }catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

propositionRouter.put("/:id", async (req, res) => {
    try {
        const propositionId = parseInt(String(req.params.id));

        if (isNaN(propositionId)) {
            return res.status(400).json({ message: "Invalid proposition ID" });
        }

        const proposition = await prisma.proposition.findUnique({
            where: { id: propositionId },
        });

        if (!proposition) {
            return res.status(404).json({ message: "Proposition not found" });
        }
        
        const { description, isValid, questionId } = req.body.data;

        const updatedProposition = await prisma.proposition.update({
            where: { id: propositionId },
            data: {
                description,
                isValid,
                questionId,
            },
        });

        res.status(200).json(updatedProposition);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

propositionRouter.delete("/:id", async (req, res) => {
    try {
        const propositionId = parseInt(String(req.params.id));

        if (isNaN(propositionId)) {
            return res.status(400).json({ message: "Invalid proposition ID" });
        }

        const proposition = await prisma.proposition.findUnique({
            where: { id: propositionId },
        });

        if (!proposition) {
            return res.status(404).json({ message: "Proposition not found" });
        }

        await prisma.proposition.delete({
            where: { id: propositionId },
        });

        res.status(204).json({message: "Proposition deleted successfully"});

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})  
