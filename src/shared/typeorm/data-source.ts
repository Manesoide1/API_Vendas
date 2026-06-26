import Customer from "@modules/customers/typeorm/entities/Customer";
import Product from "@modules/products/typeorm/entities/Product";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";
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
  entities: [Product, User, UserToken, Customer],
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