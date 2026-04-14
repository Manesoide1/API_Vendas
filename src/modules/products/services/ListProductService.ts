import { AppDataSource } from "@shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = AppDataSource.getRepository(Product);

    return productsRepository.find();
  }
}