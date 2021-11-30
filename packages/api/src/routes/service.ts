import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreServiceAction from '../API/Http/Actions/Service/StoreServiceAction';
import IndexServicesAction from '../API/Http/Actions/Service/IndexServicesAction';
import DestroyServiceAction from '../API/Http/Actions/Service/DestroyServiceAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import ShowServiceAction from '../API/Http/Actions/Service/ShowServiceAction';
import { ROL } from '../API/Http/Enums/UserRoles';
// import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';
// import ShowProductByNameAction from '../API/Http/Actions/Product/ShowProductByNameAction';
// import UpdateProductAction from '../API/Http/Actions/Product/UpdateProductAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexServicesAction: IndexServicesAction = DIContainer.resolve<IndexServicesAction>(IndexServicesAction);
    await indexServicesAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeServiceAction: StoreServiceAction = DIContainer.resolve<StoreServiceAction>(StoreServiceAction);
    await storeServiceAction.execute(request, response);
  }),
);
/*
router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductAction: ShowProductAction = DIContainer.resolve<ShowProductAction>(ShowProductAction);
    await showProductAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },

  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateProductAction: UpdateProductAction = DIContainer.resolve<UpdateProductAction>(UpdateProductAction);
    await updateProductAction.execute(request, response);
  }),
);
*/
router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showServiceAction: ShowServiceAction = DIContainer.resolve<ShowServiceAction>(ShowServiceAction);
    await showServiceAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyServiceAction: DestroyServiceAction = DIContainer.resolve<DestroyServiceAction>(DestroyServiceAction);
    await destroyServiceAction.execute(request, response);
  }),
);

export default router;
