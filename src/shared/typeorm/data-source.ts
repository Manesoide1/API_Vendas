import Product from "@modules/products/typeorm/entities/Product";
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
    entities: [Product],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")]
})