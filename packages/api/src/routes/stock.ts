import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexStockAction from '../API/Http/Actions/Stock/IndexStockAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';

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

export default router;
