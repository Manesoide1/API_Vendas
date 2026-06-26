import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
interface IRequest {
  user_id: string;
  avatarFileName: string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found.");
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      try {
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      } catch {
        // ignora se o arquivo não existir
      }
    }
    user.avatar = avatarFileName;
    await usersRepository.createUser(user); // ou save(user) se preferir manter o método original
    return user;
  }
}
