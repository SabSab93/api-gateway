import { PrismaClient } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { catRouter } from "./router/cats";
import { userRouter } from "./router/users";
import { authBearer } from "./middlewares/authBearer";
import { roomRouter } from "./router/rooms";

export const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "MiaouHotel API fonctionne 🐱" });
});

app.use("/api", apiRouter);


apiRouter.use("/cats", authBearer, catRouter)
apiRouter.use("/auth", userRouter)
apiRouter.use("/rooms", roomRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MiaouHotel API est en cours d'exécution sur le port ${PORT} 🐱`);
});