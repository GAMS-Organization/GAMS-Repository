import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexStockAction from '../API/Http/Actions/Stock/IndexStockAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import UpdateStockAction from '../API/Http/Actions/Stock/UpdateStockAction';
import { ROL } from '../API/Http/Enums/UserRoles';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexStockAction: IndexStockAction = DIContainer.resolve<IndexStockAction>(IndexStockAction);
    await indexStockAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateStockAction: UpdateStockAction = DIContainer.resolve<UpdateStockAction>(UpdateStockAction);
    await updateStockAction.execute(request, response);
  }),
);

export default router;
