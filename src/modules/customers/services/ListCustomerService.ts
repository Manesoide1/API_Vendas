import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = new CustomersRepository();

    const customers = await customerRepository.findAll();

    return customers;
  }
}
