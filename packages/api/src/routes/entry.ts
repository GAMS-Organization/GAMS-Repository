import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexEntryAction from '../API/Http/Actions/Entry/IndexEntryAction';
import StoreEntryAction from '../API/Http/Actions/Entry/StoreEntryAction';
import DestroyEntryAction from '../API/Http/Actions/Entry/DestroyEntryAction';
import ShowEntryAction from '../API/Http/Actions/Entry/ShowEntryAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexEntryAction: IndexEntryAction = DIContainer.resolve<IndexEntryAction>(IndexEntryAction);
    await indexEntryAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeEntryAction: StoreEntryAction = DIContainer.resolve<StoreEntryAction>(StoreEntryAction);
    await storeEntryAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showEntryAction: ShowEntryAction = DIContainer.resolve<ShowEntryAction>(ShowEntryAction);
    await showEntryAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyEntryAction: DestroyEntryAction = DIContainer.resolve<DestroyEntryAction>(DestroyEntryAction);
    await destroyEntryAction.execute(request, response);
  }),
);

export default router;
