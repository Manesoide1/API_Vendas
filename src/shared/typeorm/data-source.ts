import Product from "@modules/products/typeorm/entities/Product";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";
import Customer from "@modules/customers/typeorm/entities/Customer";
import Order from "@modules/orders/typeorm/entities/Order";
import OrderProducts from "@modules/orders/typeorm/entities/OrderProducts";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "api_vendas",
  synchronize: false,
  logging: true,
  entities: [Product, User, UserToken, Customer, Order, OrderProducts],
  migrations: [
    path.join(
      "src",
      "shared",
      "typeorm",
      "migrations",
      "*.ts"
    )
  ]
});