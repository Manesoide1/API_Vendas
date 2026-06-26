import ProductsRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = new OrdersRepository();
    const customersRepository = new CustomersRepository();
    const productsRepository = new ProductsRepository();

    // Verifica se o cliente existe
    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    // Busca os produtos
    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }

    // Verifica produtos inexistentes
    const existsProductsIds = existsProducts.map((product) => product.id);
    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`
      );
    }

    // Verifica quantidades disponíveis
    const quantityUnavailable = products.filter(
      (product) =>
        existsProducts.find((p) => p.id === product.id)!.quantity < product.quantity
    );
    if (quantityUnavailable.length) {
      throw new AppError(
        `The quantity ${quantityUnavailable[0].quantity} is not available for ${quantityUnavailable[0].id}.`
      );
    }

    // Serializa produtos para criar o pedido (mantendo product_id)
    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.find((p) => p.id === product.id)!.price,
    }));

    // Cria o pedido
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts, // agora compatível com IProduct[]
    });

    // Atualiza as quantidades dos produtos
    const { orders_products } = order;
    const updatedProducts = existsProducts.map((product) => {
      const orderedProduct = orders_products.find(
        (orderProduct) => orderProduct.product.id === product.id
      );
      if (orderedProduct) {
        product.quantity -= orderedProduct.quantity;
      }
      return product;
    });

    await productsRepository.save(updatedProducts);

    return order;
  }
}