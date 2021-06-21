import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreElementRequestAction from '../API/Http/Actions/ElementRequest/StoreElementRequestAction';
//import UpdateElementRequestAction from '../API/Http/Actions/ElementRequest/UpdateElementRequestAction';
//import IndexElementRequestsAction from '../API/Http/Actions/ElementRequest/IndexElementRequestsAction';
//import ShowElementRequestAction from '../API/Http/Actions/ElementRequest/ShowElementRequestAction';
//import DestroyElementRequestAction from '../API/Http/Actions/ElementRequest/DestroyElementRequestAction';
//import ShowElementRequestByNameAction from '../API/Http/Actions/ElementRequest/ShowElementRequestByNameAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import UpdateElementRequestAction from '../API/Http/Actions/ElementRequest/UpdateElementRequestAction';

const router = express.Router();

// router.get(
//   '/',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const indexElementRequestAction: IndexElementRequestsAction = DIContainer.resolve<
//       IndexElementRequestsAction
//     >(IndexElementRequestsAction);
//     await indexElementRequestAction.execute(request, response);
//   }),
// );

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal', 'user']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeElementRequestAction: StoreElementRequestAction = DIContainer.resolve<StoreElementRequestAction>(
      StoreElementRequestAction,
    );
    await storeElementRequestAction.execute(request, response);
  }),
);

// router.get(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showElementRequestAction: ShowElementRequestAction = DIContainer.resolve<ShowElementRequestAction>(
//       ShowElementRequestAction,
//     );
//     await showElementRequestAction.execute(request, response);
//   }),
// );
//
router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateElementRequestAction: UpdateElementRequestAction = DIContainer.resolve<UpdateElementRequestAction>(
      UpdateElementRequestAction,
    );
    await updateElementRequestAction.execute(request, response);
  }),
);
//
// router.get(
//   '/name/:name([a-z0-9-]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showElementRequestByNameAction: ShowElementRequestByNameAction = DIContainer.resolve<
//       ShowElementRequestByNameAction
//     >(ShowElementRequestByNameAction);
//     await showElementRequestByNameAction.execute(request, response);
//   }),
// );
//
// router.delete(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const destroyElementRequestAction: DestroyElementRequestAction = DIContainer.resolve<
//       DestroyElementRequestAction
//     >(DestroyElementRequestAction);
//     await destroyElementRequestAction.execute(request, response);
//   }),
// );

export default router;
