import { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import Data from "./data";

const routes = (app: Express) => {
  app.get("/api/products", (req: Request, res: Response) => {
    res.status(200).json(Data);
  });

  app.post("/api/products", (req: Request, res: Response) => {
    try {
      const { title, price, category } = req.body;
      console.log(req.body);

      if (!title || !price || !category) {
        return res
          .status(400)
          .json({ error: "Title , price and Category are required" });
      }

      const generateProductId = () => {
        return Math.floor(Math.random() * 1000);
      };
      const newProduct = {
        id: generateProductId(),
        title,
        price,
        category,
      };

      Data.push(newProduct);
      res.status(201).json(newProduct);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

  app.get("/api/products/:id", (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);

      const product = Data.find((p) => p.id === productId);

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

  app.put("/api/products/:id", (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      const updatedProduct = req.body;

      const index = Data.findIndex((product) => product.id == productId);

      if (index !== -1) {
        Data[index] = { ...Data[index], ...updatedProduct };
        res.status(200).json(Data[index]);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

  app.delete("/api/products/:id", (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);

      const index = Data.findIndex((product) => product.id === productId);
      Data.splice(index, 1)[0];
      if (index) {
        res.status(200).json({ msg: "Product has been deleted" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
};

export default routes;
