import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = AppDataSource.getRepository(Product);

    const product = await productsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError("Product not found.");
    }

    const productExists = await productsRepository.findOneBy({ name });

    if (productExists && productExists.id !== product.id) {
      throw new AppError("There is already one product with this name.");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}