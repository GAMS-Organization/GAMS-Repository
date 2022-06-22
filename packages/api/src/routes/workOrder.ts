import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreWorkOrderAction from '../API/Http/Actions/WorkOrder/StoreWorkOrderAction';
import IndexWorkOrdersAction from '../API/Http/Actions/WorkOrder/IndexWorkOrdersAction';
import UpdateWorkOrderAction from '../API/Http/Actions/WorkOrder/UpdateWorkOrderAction';
import AssignWorkOrderAction from '../API/Http/Actions/WorkOrder/AssignWorkOrderAction';
import TakeWorkOrderAction from '../API/Http/Actions/WorkOrder/TakeWorkOrderAction';
import CancelWorkOrderAction from '../API/Http/Actions/WorkOrder/CancelWorkOrderAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import CompleteWorkOrderAction from '../API/Http/Actions/WorkOrder/CompleteWorkOrderAction';
import IndexWorkOrdersByAuthorAction from '../API/Http/Actions/WorkOrder/IndexWorkOrdersByAuthorAction';
import IndexWorkOrdersByWorkerAction from '../API/Http/Actions/WorkOrder/IndexWorkOrdersByWorkerAction';
import ShowWorkOrderAction from '../API/Http/Actions/WorkOrder/ShowWorkOrderAction';
import { ROL } from '../API/Http/Enums/UserRoles';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexWorkOrdersAction: IndexWorkOrdersAction = DIContainer.resolve<IndexWorkOrdersAction>(
      IndexWorkOrdersAction,
    );
    await indexWorkOrdersAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeWorkOrderAction: StoreWorkOrderAction = DIContainer.resolve<StoreWorkOrderAction>(StoreWorkOrderAction);
    await storeWorkOrderAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateWorkOrderAction: UpdateWorkOrderAction = DIContainer.resolve<UpdateWorkOrderAction>(
      UpdateWorkOrderAction,
    );
    await updateWorkOrderAction.execute(request, response);
  }),
);

router.put(
  '/assign/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const assignWorkOrderAction: AssignWorkOrderAction = DIContainer.resolve<AssignWorkOrderAction>(
      AssignWorkOrderAction,
    );
    await assignWorkOrderAction.execute(request, response);
  }),
);

router.put(
  '/take/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const takeWorkOrderAction: TakeWorkOrderAction = DIContainer.resolve<TakeWorkOrderAction>(TakeWorkOrderAction);
    await takeWorkOrderAction.execute(request, response);
  }),
);

router.put(
  '/cancel/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const cancelWorkOrderAction: CancelWorkOrderAction = DIContainer.resolve<CancelWorkOrderAction>(
      CancelWorkOrderAction,
    );
    await cancelWorkOrderAction.execute(request, response);
  }),
);

router.post(
  '/complete/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const comppleteWorkOrderAction: CompleteWorkOrderAction = DIContainer.resolve<CompleteWorkOrderAction>(
      CompleteWorkOrderAction,
    );
    await comppleteWorkOrderAction.execute(request, response);
  }),
);

router.get(
  '/myWorkOrders',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexWorkOrdersByAuthorAction: IndexWorkOrdersByAuthorAction = DIContainer.resolve<
      IndexWorkOrdersByAuthorAction
    >(IndexWorkOrdersByAuthorAction);
    await indexWorkOrdersByAuthorAction.execute(request, response);
  }),
);

router.get(
  '/byWorker',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexWorkOrdersByWorkerAction: IndexWorkOrdersByWorkerAction = DIContainer.resolve<
      IndexWorkOrdersByWorkerAction
    >(IndexWorkOrdersByWorkerAction);
    await indexWorkOrdersByWorkerAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showWorkOrderAction: ShowWorkOrderAction = DIContainer.resolve<ShowWorkOrderAction>(ShowWorkOrderAction);
    await showWorkOrderAction.execute(request, response);
  }),
);
/*
router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
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
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyWorkOrderAction: DestroyWorkOrderAction = DIContainer.resolve<DestroyWorkOrderAction>(DestroyWorkOrderAction);
    await destroyWorkOrderAction.execute(request, response);
  }),
);
*/

export default router;
