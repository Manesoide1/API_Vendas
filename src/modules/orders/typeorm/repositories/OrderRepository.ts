import { Repository } from "typeorm";
import { AppDataSource } from "@shared/typeorm/data-source";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export default class OrdersRepository {
  findAll() {
      throw new Error("Method not implemented.");
  }
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({
      where: { id },
      relations: ["orders_products", "customer"],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const orderProducts = products.map((p) => ({
      product: { id: p.product_id }, // usar "product" e não "product_id"
      quantity: p.quantity,
      price: p.price,
    }));

    const order = this.ormRepository.create({
      customer,
      orders_products: orderProducts,
    });

    await this.ormRepository.save(order);
    return order;
  }
}
