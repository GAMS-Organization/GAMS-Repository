import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreAssetAction from '../API/Http/Actions/Asset/StoreAssetAction';
import IndexAssetsAction from '../API/Http/Actions/Asset/IndexAssetsAction';
import DestroyAssetAction from '../API/Http/Actions/Asset/DestroyAssetAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import ShowAssetAction from '../API/Http/Actions/Asset/ShowAssetAction';
// import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';
// import ShowProductByNameAction from '../API/Http/Actions/Product/ShowProductByNameAction';
// import UpdateProductAction from '../API/Http/Actions/Product/UpdateProductAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexAssetsAction: IndexAssetsAction = DIContainer.resolve<IndexAssetsAction>(IndexAssetsAction);
    await indexAssetsAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeAssetAction: StoreAssetAction = DIContainer.resolve<StoreAssetAction>(StoreAssetAction);
    await storeAssetAction.execute(request, response);
  }),
);

router.get(
  '/filters/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showAssetAction: ShowAssetAction = DIContainer.resolve<ShowAssetAction>(ShowAssetAction);
    await showAssetAction.execute(request, response);
  }),
);
/*
router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductAction: ShowProductAction = DIContainer.resolve<ShowProductAction>(ShowProductAction);
    await showProductAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateProductAction: UpdateProductAction = DIContainer.resolve<UpdateProductAction>(UpdateProductAction);
    await updateProductAction.execute(request, response);
  }),
);

router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductByNameAction: ShowProductByNameAction = DIContainer.resolve<ShowProductByNameAction>(
      ShowProductByNameAction,
    );
    await showProductByNameAction.execute(request, response);
  }),
);
*/

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyAssetAction: DestroyAssetAction = DIContainer.resolve<DestroyAssetAction>(DestroyAssetAction);
    await destroyAssetAction.execute(request, response);
  }),
);

export default router;
