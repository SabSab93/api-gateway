import express from "express";
import cors from "cors";
import "dotenv/config";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

const qcmProxy = createProxyMiddleware({
  target: "http://localhost:3001/qcms",
  changeOrigin: true,
});
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.use("/api/qcms", qcmProxy);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway lancé sur le port ${PORT}`);
});