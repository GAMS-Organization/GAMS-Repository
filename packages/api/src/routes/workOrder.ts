import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreWorkOrderAction from '../API/Http/Actions/WorkOrder/StoreWorkOrderAction';
import IndexWorkOrdersAction from '../API/Http/Actions/WorkOrder/IndexWorkOrdersAction';
// import UpdateWorkOrderAction from '../API/Http/Actions/WorkOrder/UpdateWorkOrderAction';
// import ShowWorkOrderAction from '../API/Http/Actions/WorkOrder/ShowWorkOrderAction';
// import DestroyWorkOrderAction from '../API/Http/Actions/WorkOrder/DestroyWorkOrderAction';
// import ShowWorkOrderByNameAction from '../API/Http/Actions/WorkOrder/ShowWorkOrderByNameAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexWorkOrdersAction: IndexWorkOrdersAction = DIContainer.resolve<IndexWorkOrdersAction>(IndexWorkOrdersAction);
    await indexWorkOrdersAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal', 'user']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeWorkOrderAction: StoreWorkOrderAction = DIContainer.resolve<StoreWorkOrderAction>(StoreWorkOrderAction);
    await storeWorkOrderAction.execute(request, response);
  }),
);
/*
router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showWorkOrderAction: ShowWorkOrderAction = DIContainer.resolve<ShowWorkOrderAction>(ShowWorkOrderAction);
    await showWorkOrderAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateWorkOrderAction: UpdateWorkOrderAction = DIContainer.resolve<UpdateWorkOrderAction>(UpdateWorkOrderAction);
    await updateWorkOrderAction.execute(request, response);
  }),
);

router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showWorkOrderByNameAction: ShowWorkOrderByNameAction = DIContainer.resolve<ShowWorkOrderByNameAction>(
      ShowWorkOrderByNameAction,
    );
    await showWorkOrderByNameAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyWorkOrderAction: DestroyWorkOrderAction = DIContainer.resolve<DestroyWorkOrderAction>(DestroyWorkOrderAction);
    await destroyWorkOrderAction.execute(request, response);
  }),
);
*/

export default router;
