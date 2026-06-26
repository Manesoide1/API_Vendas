import { Request, Response, NextFunction } from "express";
import CreateSessionsService from "../services/CreateSessionService";
export default class SessionsController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const service = new CreateSessionsService();
      const result = await service.execute({ email, password });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
