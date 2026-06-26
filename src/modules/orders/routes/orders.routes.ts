import { Router } from "express";
import OrdersController from "../controllers/OrderController";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get("/", ordersController.index); // GET /orders
ordersRouter.get("/:id", ordersController.show); // GET /orders/:id
ordersRouter.post("/", ordersController.create); // POST /orders

export default ordersRouter;
