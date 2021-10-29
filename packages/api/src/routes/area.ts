import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import IndexAreasAction from '../API/Http/Actions/Area/IndexAreasAction';
import DestroyAreaAction from '../API/Http/Actions/Area/DestroyAreaAction';
import StoreAreaAction from '../API/Http/Actions/Area/StoreAreaAction';
import ShowAreaBySectorAction from '../API/Http/Actions/Area/ShowAreaBySectorAction';
import UpdateAreaAction from '../API/Http/Actions/Area/UpdateAreaAction';
import UploadImageAction from '../API/Http/Actions/Area/UploadMapAreaAction';
import { ROL } from '../API/Http/Enums/UserRoles';
// import ShowProductAction from '../API/Http/Actions/Product/ShowProductAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexAreasAction: IndexAreasAction = DIContainer.resolve<IndexAreasAction>(IndexAreasAction);
    await indexAreasAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeAreaAction: StoreAreaAction = DIContainer.resolve<StoreAreaAction>(StoreAreaAction);
    await storeAreaAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateAreaAction: UpdateAreaAction = DIContainer.resolve<UpdateAreaAction>(UpdateAreaAction);
    await updateAreaAction.execute(request, response);
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
*/
router.get(
  '/sector/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showAreaBySectorAction: ShowAreaBySectorAction = DIContainer.resolve<ShowAreaBySectorAction>(
      ShowAreaBySectorAction,
    );
    await showAreaBySectorAction.execute(request, response);
  }),
);

router.post(
  '/map/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const uploadImageAction: UploadImageAction = DIContainer.resolve<UploadImageAction>(UploadImageAction);
    await uploadImageAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyAreaAction: DestroyAreaAction = DIContainer.resolve<DestroyAreaAction>(DestroyAreaAction);
    await destroyAreaAction.execute(request, response);
  }),
);

export default router;
