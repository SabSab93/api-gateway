import { Router } from "express";
import { prisma } from "../index";
import  argon2  from "argon2";
import jwt from "jsonwebtoken";


export const userRouter= Router();


userRouter.post("/register", async (req, res) => {
  try {
    const { firstname, email, password } = req.body.data;

    if (!firstname || !email || !password) {
      return res.status(400).json({
        message: "Firstname, email et mot de passe obligatoires",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(200).json({
        message: "Si les informations sont valides, votre demande sera traitée.",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        firstname,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Utilisateur créé",
      data: {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "Identifiantsou mtp incorrects",
      });
    }

    const isPasswordValid = await argon2.verify(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Identifiants ou mtp incorrects",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});