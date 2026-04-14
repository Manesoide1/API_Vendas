import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = AppDataSource.getRepository(Product);

    const product = await productsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError("Product not found.");
    }

    await productsRepository.remove(product);
  }
}