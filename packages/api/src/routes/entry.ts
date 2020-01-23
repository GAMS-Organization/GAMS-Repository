import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexEntryAction from '../API/Http/Actions/Entry/IndexEntryAction';
import UpdateUsersAction from '../API/Http/Actions/Users/UpdateUsersAction';
import DisableUsersAction from '../API/Http/Actions/Users/DisableUsersAction';
import StoreEntryAction from '../API/Http/Actions/Entry/StoreEntryAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import EnableUsersAction from '../API/Http/Actions/Users/EnableUsersAction';
import DestroyEntryAction from '../API/Http/Actions/Entry/DestroyEntryAction';
import ShowEntryAction from '../API/Http/Actions/Entry/ShowEntryAction';

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

router.put(
  '/:id([0-9]+)',
    (req, res, next): void => {
        authMiddleware(req, res, next);
    },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateUsersAction: UpdateUsersAction = DIContainer.resolve<UpdateUsersAction>(UpdateUsersAction);
    await updateUsersAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/disable',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const disableUsersAction: DisableUsersAction = DIContainer.resolve<DisableUsersAction>(DisableUsersAction);
    await disableUsersAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/enable',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const enableUsersAction: EnableUsersAction = DIContainer.resolve<EnableUsersAction>(EnableUsersAction);
    await enableUsersAction.execute(request, response);
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
