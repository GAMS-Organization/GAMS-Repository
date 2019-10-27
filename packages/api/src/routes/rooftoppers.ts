import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import StoreRooftopperAction from '../API/Http/Actions/Rooftoppers/StoreRooftopperAction';
import IndexRooftoppersAction from '../API/Http/Actions/Rooftoppers/IndexRooftoppersAction';
import UpdateRooftopperAction from '../API/Http/Actions/Rooftoppers/UpdateRooftopperAction';
import DisableRooftopperByIdAction from '../API/Http/Actions/Rooftoppers/DisableRooftopperByIdAction';
import EnableRooftopperByIdAction from '../API/Http/Actions/Rooftoppers/EnableRooftopperByIdAction';
import DestroyRooftopperAction from '../API/Http/Actions/Rooftoppers/DestroyRooftopperAction';
import ShowRooftopperByIdAction from '../API/Http/Actions/Rooftoppers/showRooftopperByIdAction';
import ShowRooftopperBySlugAction from '../API/Http/Actions/Rooftoppers/showRooftopperBySlugAction';

const router = express.Router();

router.post(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeRooftopperAction: StoreRooftopperAction = DIContainer.resolve<StoreRooftopperAction>(
      StoreRooftopperAction,
    );
    await storeRooftopperAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showRooftoppersByIdAction: ShowRooftopperByIdAction = DIContainer.resolve<ShowRooftopperByIdAction>(
      ShowRooftopperByIdAction,
    );
    await showRooftoppersByIdAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateRooftopperAction: UpdateRooftopperAction = DIContainer.resolve<UpdateRooftopperAction>(
      UpdateRooftopperAction,
    );
    await updateRooftopperAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/disable',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const disableRooftopperProfileAction: DisableRooftopperByIdAction = DIContainer.resolve<
      DisableRooftopperByIdAction
    >(DisableRooftopperByIdAction);
    await disableRooftopperProfileAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)/enable',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const enableRooftopperProfileAction: EnableRooftopperByIdAction = DIContainer.resolve<EnableRooftopperByIdAction>(
      EnableRooftopperByIdAction,
    );
    await enableRooftopperProfileAction.execute(request, response);
  }),
);

router.get(
  '/slug/:slug([a-z0-9-]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showRooftoppersBySlugAction: ShowRooftopperBySlugAction = DIContainer.resolve<ShowRooftopperBySlugAction>(
      ShowRooftopperBySlugAction,
    );
    await showRooftoppersBySlugAction.execute(request, response);
  }),
);

router.get(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexRooftoppersAction: IndexRooftoppersAction = DIContainer.resolve<IndexRooftoppersAction>(
      IndexRooftoppersAction,
    );
    await indexRooftoppersAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyUsersAction: DestroyRooftopperAction = DIContainer.resolve<DestroyRooftopperAction>(
      DestroyRooftopperAction,
    );
    await destroyUsersAction.execute(request, response);
  }),
);

export default router;
