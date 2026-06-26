import { AppDataSource } from "@shared/typeorm/data-source";
import { In, Repository } from "typeorm";
import Product from "../entities/Product";

interface IFindProducts {
  id: string;
}

export default class ProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async find(): Promise<Product[]> {
    return this.ormRepository.find({
      relations: ["customer", "orders_products"],
    });
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.id);
    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });
    return existsProducts;
  }

  public async save(products: Product[]): Promise<Product[]> {
    return await this.ormRepository.save(products);
  }
}
