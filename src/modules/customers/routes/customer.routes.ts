import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticadted from '@shared/http/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticadted); //todas autenticadas

customersRouter.get('/',  async (req, res, next) => {
    try {
      await  customersController.index(req, res, next);
    } catch (err) {
      next(err);
    }
  });

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
  }), async (req, res, next) => {
    try {
      await customersController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  });

customersRouter.post('/',
celebrate({
  [Segments.BODY] : { name: Joi.string().required(),
  email: Joi.string().required()}
}), async (req, res, next) => {
    try {
      await customersController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  });

customersRouter.put('/:id',
celebrate({
  [Segments.BODY] : { name: Joi.string().required(),
    email: Joi.string().required()},
  [Segments.PARAMS]: {id: Joi.string().uuid().required(),}
}), async (req, res, next) => {
    try {
      await customersController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  });

customersRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}), async (req, res, next) => {
    try {
      await customersController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  });

export default customersRouter;