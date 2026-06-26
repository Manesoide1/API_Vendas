import productsRouter from "@modules/products/routes/product.routes";
import usersRouter from "@modules/users/routes/Users.Routes";
import sessionsRouter from "@modules/users/routes/Sessions.Routes"
import passwordRouter from "@modules/users/routes/Password.Routes";
import profileRouter from "@modules/users/routes/Profile.Routes";
import customersRouter from "@modules/customers/routes/customer.routes";
import ordersRouter from "@modules/orders/routes/orders.routes";
import {Router} from "express";

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

routes.get('/', (request, response) => {
    response.json({message: 'Hello Dev!'});
    return;
})

export default routes;