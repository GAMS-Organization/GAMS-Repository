import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreToolRequestAction from '../API/Http/Actions/ToolRequest/StoreToolRequestAction';
//import UpdateToolRequestAction from '../API/Http/Actions/ToolRequest/UpdateToolRequestAction';
import IndexToolRequestsAction from '../API/Http/Actions/ToolRequest/IndexToolRequestAction';
//import ShowToolRequestAction from '../API/Http/Actions/ToolRequest/ShowToolRequestAction';
import DestroyToolRequestAction from '../API/Http/Actions/ToolRequest/DestroyToolRequestAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import UpdateToolRequestAction from '../API/Http/Actions/ToolRequest/UpdateToolRequestAction';
import { ROL } from '../API/Http/Enums/UserRoles';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexToolRequestAction: IndexToolRequestsAction = DIContainer.resolve<IndexToolRequestsAction>(
      IndexToolRequestsAction,
    );
    await indexToolRequestAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeToolRequestAction: StoreToolRequestAction = DIContainer.resolve<StoreToolRequestAction>(
      StoreToolRequestAction,
    );
    await storeToolRequestAction.execute(request, response);
  }),
);

// router.get(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showToolRequestAction: ShowToolRequestAction = DIContainer.resolve<ShowToolRequestAction>(
//       ShowToolRequestAction,
//     );
//     await showToolRequestAction.execute(request, response);
//   }),
// );
//
router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateToolRequestAction: UpdateToolRequestAction = DIContainer.resolve<UpdateToolRequestAction>(
      UpdateToolRequestAction,
    );
    await updateToolRequestAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyToolRequestAction: DestroyToolRequestAction = DIContainer.resolve<DestroyToolRequestAction>(
      DestroyToolRequestAction,
    );
    await destroyToolRequestAction.execute(request, response);
  }),
);

export default router;
