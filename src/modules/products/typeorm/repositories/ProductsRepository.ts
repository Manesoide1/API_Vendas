import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import Product from "../entities/Product";

export default class ProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }
}