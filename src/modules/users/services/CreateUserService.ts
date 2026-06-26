import { hash } from "bcryptjs";
import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
interface IRequest {
  name: string;
  email: string;
  password: string;
}
export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email address already used");
    }
    const hashedPassword = await hash(password, 8);
    const user = await usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
