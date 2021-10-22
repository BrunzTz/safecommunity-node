import { Router } from "express";
const routes = Router();

import userController from '../features/controller/userController';

routes.get('/teste', userController.listAll)
routes.get('/teste1', userController.listOne)

export default routes;