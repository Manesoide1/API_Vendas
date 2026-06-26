import { NextFunction, Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";
import ListOrderService from "../services/ListOrderService";

export default class OrdersController {
  constructor() {}


  public async show(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const id = request.params.id as string;

      const showOrder = new ShowOrderService();
      const order = await showOrder.execute({ id });
      return response.json(order);
    } catch (err) {
      next(err);
      return response;
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { customer_id, products } = request.body;
      const createOrder = new CreateOrderService();
      const order = await createOrder.execute({ customer_id, products });
      return response.json(order);
    } catch (err) {
      next(err);
      return response;
    }
  }
}