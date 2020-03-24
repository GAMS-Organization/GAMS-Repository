import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import IndexDepartureAction from '../API/Http/Actions/Departure/IndexDepartureAction';
import StoreDepartureAction from '../API/Http/Actions/Departure/StoreDepartureAction';
import DestroyDepartureAction from '../API/Http/Actions/Departure/DestroyDepartureAction';
import ShowDepartureAction from '../API/Http/Actions/Departure/ShowDepartureAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexDepartureAction: IndexDepartureAction = DIContainer.resolve<IndexDepartureAction>(IndexDepartureAction);
    await indexDepartureAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeDepartureAction: StoreDepartureAction = DIContainer.resolve<StoreDepartureAction>(StoreDepartureAction);
    await storeDepartureAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showDepartureAction: ShowDepartureAction = DIContainer.resolve<ShowDepartureAction>(ShowDepartureAction);
    await showDepartureAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyDepartureAction: DestroyDepartureAction = DIContainer.resolve<DestroyDepartureAction>(
      DestroyDepartureAction,
    );
    await destroyDepartureAction.execute(request, response);
  }),
);

export default router;
