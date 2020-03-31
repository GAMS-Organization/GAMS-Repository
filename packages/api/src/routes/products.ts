import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreProductAction from '../API/Http/Actions/Product/StoreProductAction';
import UpdateProductAction from '../API/Http/Actions/Product/UpdateProductAction';
import IndexProductsAction from '../API/Http/Actions/Product/IndexProductsAction';
import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';
import DestroyProductAction from '../API/Http/Actions/Product/DestroyProductAction';
import ShowProductByNameAction from '../API/Http/Actions/Product/ShowProductByNameAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexProductAction: IndexProductsAction = DIContainer.resolve<IndexProductsAction>(IndexProductsAction);
    await indexProductAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeProductAction: StoreProductAction = DIContainer.resolve<StoreProductAction>(StoreProductAction);
    await storeProductAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductAction: ShowProductAction = DIContainer.resolve<ShowProductAction>(ShowProductAction);
    await showProductAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateProductAction: UpdateProductAction = DIContainer.resolve<UpdateProductAction>(UpdateProductAction);
    await updateProductAction.execute(request, response);
  }),
);

router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductByNameAction: ShowProductByNameAction = DIContainer.resolve<ShowProductByNameAction>(
      ShowProductByNameAction,
    );
    await showProductByNameAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyProductAction: DestroyProductAction = DIContainer.resolve<DestroyProductAction>(DestroyProductAction);
    await destroyProductAction.execute(request, response);
  }),
);

export default router;
