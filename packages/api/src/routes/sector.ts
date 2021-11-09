import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import IndexSectorsAction from '../API/Http/Actions/Sector/IndexSectorsAction';
import DestroySectorAction from '../API/Http/Actions/Sector/DestroySectorAction';
import StoreSectorAction from '../API/Http/Actions/Sector/StoreSectorAction';
import UploadImageAction from '../API/Http/Actions/Sector/UploadMapSectorAction';
import UpdateSectorAction from '../API/Http/Actions/Sector/UpdateSectorAction';
import ShowSectorAction from '../API/Http/Actions/Sector/ShowSectorAction';
import { ROL } from '../API/Http/Enums/UserRoles';
// import ShowSectorByNameAction from '../API/Http/Actions/Sector/ShowSectorByNameAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },

  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexSectorsAction: IndexSectorsAction = DIContainer.resolve<IndexSectorsAction>(IndexSectorsAction);
    await indexSectorsAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateSectorAction: UpdateSectorAction = DIContainer.resolve<UpdateSectorAction>(UpdateSectorAction);
    await updateSectorAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeSectorAction: StoreSectorAction = DIContainer.resolve<StoreSectorAction>(StoreSectorAction);
    await storeSectorAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showSectorAction: ShowSectorAction = DIContainer.resolve<ShowSectorAction>(ShowSectorAction);
    await showSectorAction.execute(request, response);
  }),
);

router.post(
  '/map/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS, ROL.PERSONAL]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const uploadImageAction: UploadImageAction = DIContainer.resolve<UploadImageAction>(UploadImageAction);
    await uploadImageAction.execute(request, response);
  }),
);

/*
router.get(
  '/name/:name([a-z0-9-]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showSectorByNameAction: ShowSectorByNameAction = DIContainer.resolve<ShowSectorByNameAction>(
      ShowSectorByNameAction,
    );
    await showSectorByNameAction.execute(request, response);
  }),
);
*/
router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, [ROL.ADMIN, ROL.BOSS]);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroySectorAction: DestroySectorAction = DIContainer.resolve<DestroySectorAction>(DestroySectorAction);
    await destroySectorAction.execute(request, response);
  }),
);

export default router;
