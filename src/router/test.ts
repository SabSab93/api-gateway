import { Router } from "express";

export const filmRouter = Router();

// BODY: POST /api/films/add/body
// Exemple:
// {
//   "data": {
//     "title": "Inception",
//     "year": 2010,
//     "description": "Un voleur infiltre les reves."
//   }
// }
filmRouter.post("/add/body", (req, res) => {
  const { title, year, description } = req.body.data;
  return res.status(201).json({
    source: "body",
    title,
    year,
    description,
  });
});

// QUERY: POST /api/films/add/query?title=Inception&year=2010&description=film
// Exemple URL:
// /api/films/add/query?title=Inception&year=2010&description=Un%20voleur%20infiltre%20les%20reves
filmRouter.post("/add/query", (req, res) => {
  const { title, year, description } = req.query;
  return res.status(201).json({
    source: "query",
    title,
    year,
    description,
  });
});

// PARAMS: POST /api/films/add/params/Inception/2010/film
// Exemple URL:
// /api/films/add/params/Inception/2010/Un-voleur-infiltre-les-reves
filmRouter.post("/add/params/:title/:year/:description", (req, res) => {
  const { title, year, description } = req.params;
  return res.status(201).json({
    source: "params",
    title,
    year,
    description,
  });
});
