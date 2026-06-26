import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = new UsersRepository();
        const usersTokensRepository = new UserTokensRepository();

        const user = await usersRepository.findByEmail(email);
        
        if (!user) {
            throw new AppError("User does not exist.");
        }

        const { token } = await usersTokensRepository.generate(user.id);

        // futuramente, enviar o token pore e-mail
        console.log(token);
    }
}