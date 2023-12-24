import express from "express";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./route";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
// const express = require('express');
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
});
routes(app);
const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server running on 8080");
});
export default app;
