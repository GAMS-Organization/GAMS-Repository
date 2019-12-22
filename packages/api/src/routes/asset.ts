import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreAssetAction from '../API/Http/Actions/Asset/StoreAssetAction';
import UpdateProductAction from '../API/Http/Actions/Product/UpdateProductAction';

import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import IndexProductsAction from '../API/Http/Actions/Product/IndexProductsAction';
import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';
import DestroyProductAction from '../API/Http/Actions/Product/DestroyProductAction';
import ShowProductByNameAction from '../API/Http/Actions/Product/ShowProductByNameAction';

const router = express.Router();

router.get(
  '/',
  /*(req, res, next): void => {
          authMiddleware(req, res, next, ['admin']);
        },
         */
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexProductAction: IndexProductsAction = DIContainer.resolve<IndexProductsAction>(IndexProductsAction);
    await indexProductAction.execute(request, response);
  }),
);

router.post(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeAssetAction: StoreAssetAction = DIContainer.resolve<StoreAssetAction>(StoreAssetAction);
    await storeAssetAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)' /*
    (req, res, next): void => {
        authMiddleware(req, res, next, ['admin']);
    },
    */,
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductAction: ShowProductAction = DIContainer.resolve<ShowProductAction>(ShowProductAction);
    await showProductAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  /*
        (req, res, next): void => {
          authMiddleware(req, res, next, ['admin']);
        },

         */
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateProductAction: UpdateProductAction = DIContainer.resolve<UpdateProductAction>(UpdateProductAction);
    await updateProductAction.execute(request, response);
  }),
);

router.get(
  '/name/:name([a-z0-9-]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductByNameAction: ShowProductByNameAction = DIContainer.resolve<ShowProductByNameAction>(
      ShowProductByNameAction,
    );
    await showProductByNameAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyProductAction: DestroyProductAction = DIContainer.resolve<DestroyProductAction>(DestroyProductAction);
    await destroyProductAction.execute(request, response);
  }),
);

export default router;
