import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexUsersAction from '../API/Http/Actions/Users/IndexUsersAction';
import ShowUsersAction from '../API/Http/Actions/Users/ShowUsersAction';
import UpdateUsersAction from '../API/Http/Actions/Users/UpdateUsersAction';
import DisableUsersAction from '../API/Http/Actions/Users/DisableUsersAction';
import StoreUsersAction from '../API/Http/Actions/Users/StoreUsersAction';
import EnableUsersAction from '../API/Http/Actions/Users/EnableUsersAction';
import DestroyUserAction from '../API/Http/Actions/Users/DestroyUserAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import { ROL } from '../API/Http/Enums/UserRoles';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexUsersAction: IndexUsersAction = DIContainer.resolve<IndexUsersAction>(IndexUsersAction);
    await indexUsersAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeUsersAction: StoreUsersAction = DIContainer.resolve<StoreUsersAction>(StoreUsersAction);
    await storeUsersAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showUsersAction: ShowUsersAction = DIContainer.resolve<ShowUsersAction>(ShowUsersAction);
    await showUsersAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateUsersAction: UpdateUsersAction = DIContainer.resolve<UpdateUsersAction>(UpdateUsersAction);
    await updateUsersAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/disable',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const disableUsersAction: DisableUsersAction = DIContainer.resolve<DisableUsersAction>(DisableUsersAction);
    await disableUsersAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/enable',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const enableUsersAction: EnableUsersAction = DIContainer.resolve<EnableUsersAction>(EnableUsersAction);
    await enableUsersAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyUsersAction: DestroyUserAction = DIContainer.resolve<DestroyUserAction>(DestroyUserAction);
    await destroyUsersAction.execute(request, response);
  }),
);

export default router;
