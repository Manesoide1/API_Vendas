import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";

export default class ListOrderService {
  public async execute(): Promise<Order[]> {
    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.findAll();

    return orders;
  }
}