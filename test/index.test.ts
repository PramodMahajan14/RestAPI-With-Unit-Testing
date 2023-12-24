import request from "supertest";
import app from "../src/index";
import supertest from "supertest";

describe("API Tests", () => {
  it("should get all items", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get a single item by ID", async () => {
    const response = await request(app).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty(
      "title",
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
  });

  it("should get a Msg- Not Found", async () => {
    const response = await request(app).get("/api/products/11");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Product not found");
  });

  it("should create a new Product", async () => {
    const newItem = {
      title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
      price: 12.89,
      category: "electronics",
    };
    const response = await request(app).post("/api/products").send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "title",
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor"
    );
  });

  it("should get Error creating new Product", async () => {
    const newItem = {
      price: 12.89,
      category: "electronics",
    };
    const response = await request(app).post("/api/products").send(newItem);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Title , price and Category are required"
    );
  });
});
