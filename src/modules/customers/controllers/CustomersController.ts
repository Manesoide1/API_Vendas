import { NextFunction, Request, response, Response } from "express";
import DeleteCustomerService from "../services/DeleteCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import ListCostumerService from "../services/ListCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const listCustomers = new ListCostumerService();
      const customer = await listCustomers.execute();
      return response.json(customer);
    } catch (err) {
      next(err);
      return response;
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = request.params.id as string;
      const showCustomer = new ShowCustomerService();
      const customer = await showCustomer.execute({ id });
      return response.json(customer);
    } catch (err) {
      next(err);
      return response;
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { name, email } = request.body;
      const createCustomer = new CreateCustomerService();
      const customer = await createCustomer.execute({ name, email });
      return response.json(customer);
    } catch (err) {
      next(err);
      return response;
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { name, email } = request.body;
      const id = request.params.id as string;
      const updateCustomer = new UpdateCustomerService();
      const customer = await updateCustomer.execute({ id, name, email });
      return response.json(customer);
    } catch (err) {
      next(err);
      return response;
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = request.params.id as string;
      const deleteCustomer = new DeleteCustomerService();
      await deleteCustomer.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
      return response;
    }
  }
}
