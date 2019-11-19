import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreProductAction from '../API/Http/Actions/Product/StoreProductAction';

import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = express.Router();

router.post(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeProductAction: StoreProductAction = DIContainer.resolve<StoreProductAction>(StoreProductAction);
    await storeProductAction.execute(request, response);
  }),
);

export default router;
