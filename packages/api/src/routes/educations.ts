import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import StoreEducationAction from '../API/Http/Actions/Educations/StoreEducationAction';
import IndexEducationsAction from '../API/Http/Actions/Educations/IndexEducationsAction';
import UpdateEducationAction from '../API/Http/Actions/Educations/UpdateEducationAction';
import ShowEducationAction from '../API/Http/Actions/Educations/ShowEducationAction';
import DestroyEducationAction from '../API/Http/Actions/Educations/DestroyEducationAction';

const router = express.Router();

router.post(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeEducationsAction: StoreEducationAction = DIContainer.resolve<StoreEducationAction>(StoreEducationAction);
    await storeEducationsAction.execute(request, response);
  }),
);

router.get(
  '/',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexEducationsAction: IndexEducationsAction = DIContainer.resolve<IndexEducationsAction>(
      IndexEducationsAction,
    );
    await indexEducationsAction.execute(request, response);
  }),
);

router.get(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const showEducationAction: ShowEducationAction = DIContainer.resolve<ShowEducationAction>(ShowEducationAction);
    await showEducationAction.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateEducationAction: UpdateEducationAction = DIContainer.resolve<UpdateEducationAction>(
      UpdateEducationAction,
    );
    await updateEducationAction.execute(request, response);
  }),
);

router.delete(
  '/:id([0-9]+)',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyEducationAction: DestroyEducationAction = DIContainer.resolve<DestroyEducationAction>(
      DestroyEducationAction,
    );
    await destroyEducationAction.execute(request, response);
  }),
);

export default router;
