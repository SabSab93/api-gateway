import express from "express";
import cors from "cors";
import "dotenv/config";
import { createProxyMiddleware } from "http-proxy-middleware";
import { requireAuth } from "./middlewares/requireAuth";

const app = express();

app.use(cors());

const authServiceUrl = process.env.AUTH_SERVICE_URL || "http://localhost:3002";
const qcmServiceUrl = process.env.QCM_SERVICE_URL || "http://localhost:3001";

const qcmProxy = createProxyMiddleware({
  target: qcmServiceUrl,
  pathRewrite: {
    "^/api/qcms": "/qcms",
  },
  changeOrigin: true,
});
const authProxy = createProxyMiddleware({
  target: authServiceUrl,
  pathRewrite: {
    "^/api/auth/local": "/auth/local",
  },
  changeOrigin: true,
});

const userProxy = createProxyMiddleware({
  target: authServiceUrl,
  pathRewrite: {
    "^/api/users": "/users",
  },
  changeOrigin: true,
});



app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.use("/api/qcms",requireAuth, qcmProxy);
app.use("/api/auth/local", authProxy);
app.use("/api/users", userProxy);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway lancé sur le port ${PORT}`);
});
