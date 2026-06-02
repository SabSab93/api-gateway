import { Router } from "express"
import {prisma} from "../index"

export const stayRouter = Router();

stayRouter.get("/", async (req , res)=> {
    try {
        const stays = await prisma.stay.findMany({include:{
            room: true,
            cat: true
        }})
        res.status(200).json(stays)
    }catch (error){
        res.status(500).json({message: "erreur serveur"})
    }
})

stayRouter.get("/:id", async (req , res)=> {
    try {
        const stayId = parseInt(String(req.params.id))
        if (isNaN(stayId)) {
            return res.status(400).json({message: "id invalid"})
        }
        const stay = await prisma.stay.findUnique({where : {id: stayId}, include:{
            room: true,
            cat: true
        }})
        if (stay) {
            return res.status(404).json({message: "slay not found"})
        }
        res.status(200).json(stay)
    }catch (error){
        res.status(500).json({message: "erreur serveur"})
    }
})

stayRouter.post("/", async (req , res)=> {
    try {
        const {startDate ,endDate,catId ,roomId } = req.body.data
        if (!startDate || !endDate || !catId  || !roomId){
            return res.status(400).json({message: "stardate , enddate catid et roomid obligatoire"})
        }
        
        const cat = await prisma.stay.findUnique({
            where: {id: catId}
        })
        if (!cat){
            return res.status(400).json({message: "Cat introuvable"})
        }

        const room = await prisma.stay.findUnique({
            where: {id: roomId}
        })
        if (!room){
            return res.status(400).json({message: "Room introuvable"})
        }  

        const stay = await prisma.stay.create({
            data: {
              startDate : new Date (startDate),
              endDate : new Date (endDate),
              catId, 
              roomId
   
        }, include:{
            room: true,
            cat: true
        }})
        if (stay) {
            return res.status(404).json({message: "slay not found"})
        }
        res.status(200).json(stay)
    }catch (error){
        res.status(500).json({message: "erreur serveur"})
    }
})


stayRouter.put("/:id", async (req , res)=> {
    try {
        const stayId = parseInt(String(req.params.id))
        if (isNaN(stayId)) {
            return res.status(400).json({message: "id invalid"})
        }
        const stay = await prisma.stay.findUnique({where : {id: stayId}, include:{
            room: true,
            cat: true
        }})
        if (stay) {
            return res.status(404).json({message: "stay not found"})
        }
        const {startDate ,endDate,catId ,roomId } = req.body.data

        const cat = await prisma.stay.findUnique({
            where: {id: catId}
        })
        if (!cat){
            return res.status(400).json({message: "Cat introuvable"})
        }

        const room = await prisma.stay.findUnique({
            where: {id: roomId}
        })
        if (!room){
            return res.status(400).json({message: "Room introuvable"})
        }  

        const stayUpdated = await prisma.stay.create({
            data: {
              startDate : new Date (startDate),
              endDate : new Date (endDate),
              catId, 
              roomId
   
        }, include:{
            room: true,
            cat: true
        }})
        if (stayUpdated) {
            return res.status(404).json({message: "slay not found"})
        }
        res.status(200).json(stayUpdated)

    }catch (error){
        res.status(500).json({message: "erreur serveur"})
    }
})

stayRouter.delete("/:id", async (req , res)=> {
    try {
        const stayId = parseInt(String(req.params.id))
        if (isNaN(stayId)) {
            return res.status(400).json({message: "id invalid"})
        }
        const stay = await prisma.stay.findUnique({where : {id: stayId}, include:{
            room: true,
            cat: true
        }})
        if (stay) {
            return res.status(404).json({message: "slay not found"})
        }
        await prisma.stay.delete({where: {id: stayId}})
        res.status(200).json({message: "stay supprimé"})
    }catch (error){
        res.status(500).json({message: "erreur serveur"})
    }
})