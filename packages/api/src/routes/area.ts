import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreAreaAction from '../API/Http/Actions/Area/StoreAreaAction';
import UpdateProductAction from '../API/Http/Actions/Product/UpdateProductAction';

import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';
import ShowProductByNameAction from '../API/Http/Actions/Product/ShowProductByNameAction';
import IndexAreasAction from '../API/Http/Actions/Area/IndexAreasAction';
import DestroyAreaAction from '../API/Http/Actions/Area/DestroyAreaAction';

const router = express.Router();

router.get(
  '/',
  /*(req, res, next): void => {
          authMiddleware(req, res, next, ['admin']);
        },
         */
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexAreasAction: IndexAreasAction = DIContainer.resolve<IndexAreasAction>(IndexAreasAction);
    await indexAreasAction.execute(request, response);
  }),
);

router.post(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeAreaAction: StoreAreaAction = DIContainer.resolve<StoreAreaAction>(StoreAreaAction);
    await storeAreaAction.execute(request, response);
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
    const destroyAreaAction: DestroyAreaAction = DIContainer.resolve<DestroyAreaAction>(DestroyAreaAction);
    await destroyAreaAction.execute(request, response);
  }),
);

export default router;
