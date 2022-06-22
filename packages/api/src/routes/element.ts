import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreElementAction from '../API/Http/Actions/Element/StoreElementAction';
import UpdateElementAction from '../API/Http/Actions/Element/UpdateElementAction';
import IndexElementsAction from '../API/Http/Actions/Element/IndexElementsAction';
import DestroyElementAction from '../API/Http/Actions/Element/DestroyElementAction';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import { authMiddleware } from '../config/authMiddleware';
import ShowElementAction from '../API/Http/Actions/Element/ShowElementAction';
import { ROL } from '../API/Http/Enums/UserRoles';
import ShowElementsByAreaAction from '../API/Http/Actions/Element/ShowElementsByAreaAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexElementsAction: IndexElementsAction = DIContainer.resolve<IndexElementsAction>(IndexElementsAction);
    await indexElementsAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeElementAction: StoreElementAction = DIContainer.resolve<StoreElementAction>(StoreElementAction);
    await storeElementAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateElementAction: UpdateElementAction = DIContainer.resolve<UpdateElementAction>(UpdateElementAction);
    await updateElementAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showElementAction: ShowElementAction = DIContainer.resolve<ShowElementAction>(ShowElementAction);
    await showElementAction.execute(request, response);
  }),
);

router.get(
  '/area/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL, ROL.USER]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showElementsByAreaAction: ShowElementsByAreaAction = DIContainer.resolve<ShowElementsByAreaAction>(
      ShowElementsByAreaAction,
    );
    await showElementsByAreaAction.execute(request, response);
  }),
);
/*
router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showProductByNameAction: ShowProductByNameAction = DIContainer.resolve<ShowProductByNameAction>(
      ShowProductByNameAction,
    );
    await showProductByNameAction.execute(request, response);
  }),
);
*/
router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyElementAction: DestroyElementAction = DIContainer.resolve<DestroyElementAction>(DestroyElementAction);
    await destroyElementAction.execute(request, response);
  }),
);

export default router;
