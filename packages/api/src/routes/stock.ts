import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexStockAction from '../API/Http/Actions/Stock/IndexStockAction';
import ShowUsersAction from '../API/Http/Actions/Users/ShowUsersAction';
import DisableUsersAction from '../API/Http/Actions/Users/DisableUsersAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import EnableUsersAction from '../API/Http/Actions/Users/EnableUsersAction';
import DestroyUserAction from '../API/Http/Actions/Users/DestroyUserAction';
import UpdateStockAction from '../API/Http/Actions/Stock/UpdateStockAction';

const router = express.Router();

router.get(
  '/',
    (req, res, next): void => {
        authMiddleware(req, res, next);
    },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexStockAction: IndexStockAction = DIContainer.resolve<IndexStockAction>(IndexStockAction);
    await indexStockAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showUsersAction: ShowUsersAction = DIContainer.resolve<ShowUsersAction>(ShowUsersAction);
    await showUsersAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
    (req, res, next): void => {
        authMiddleware(req, res, next);
    },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateStockAction: UpdateStockAction = DIContainer.resolve<UpdateStockAction>(UpdateStockAction);
    await updateStockAction.execute(request, response);
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
    const destroyUsersAction: DestroyUserAction = DIContainer.resolve<DestroyUserAction>(DestroyUserAction);
    await destroyUsersAction.execute(request, response);
  }),
);

export default router;
