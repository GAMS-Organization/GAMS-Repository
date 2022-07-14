import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreToolAction from '../API/Http/Actions/Tool/StoreToolAction';
import UpdateToolAction from '../API/Http/Actions/Tool/UpdateToolAction';
import IndexToolsAction from '../API/Http/Actions/Tool/IndexToolAction';
//import ShowToolAction from '../API/Http/Actions/Tool/ShowToolAction';
import DestroyToolAction from '../API/Http/Actions/Tool/DestroyToolAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { ROL } from '../API/Http/Enums/UserRoles';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexToolAction: IndexToolsAction = DIContainer.resolve<IndexToolsAction>(IndexToolsAction);
    await indexToolAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeToolAction: StoreToolAction = DIContainer.resolve<StoreToolAction>(StoreToolAction);
    await storeToolAction.execute(request, response);
  }),
);

// router.get(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showToolAction: ShowToolAction = DIContainer.resolve<ShowToolAction>(
//       ShowToolAction,
//     );
//     await showToolAction.execute(request, response);
//   }),
// );
//
router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateToolAction: UpdateToolAction = DIContainer.resolve<UpdateToolAction>(UpdateToolAction);
    await updateToolAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyToolAction: DestroyToolAction = DIContainer.resolve<DestroyToolAction>(DestroyToolAction);
    await destroyToolAction.execute(request, response);
  }),
);

export default router;
