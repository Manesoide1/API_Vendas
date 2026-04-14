import productsRouter from "@modules/products/routes/product.routes";
import {Router} from "express";

const routes = Router();
routes.use('/products', productsRouter);

routes.get('/', (request, response) => {
    response.json({message: 'Hello Dev!'});
    return;
})

export default routes;