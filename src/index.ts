import express from "express";
import cors from "cors";
import "dotenv/config";
import { createProxyMiddleware } from "http-proxy-middleware";
import { requireAuth } from "./middlewares/requireAuth";

const app = express();

app.use(cors());

const authServiceUrl = process.env.AUTH_SERVICE_URL || "http://localhost:3002";
const qcmServiceUrl = process.env.QCM_SERVICE_URL || "http://localhost:3001";

const authProxy = createProxyMiddleware({
  target: `${authServiceUrl}/auth/local`,
  changeOrigin: true,
});

const qcmProxy = createProxyMiddleware({
  target: `${qcmServiceUrl}/qcms`,
  changeOrigin: true,
});

const userProxy = createProxyMiddleware({
  target: `${authServiceUrl}/users`,
  changeOrigin: true,
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.use("/api/qcms", requireAuth, qcmProxy);
app.use("/api/auth/local", authProxy);
app.use("/api/users", userProxy);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway lancé sur le port ${PORT}`);
});
