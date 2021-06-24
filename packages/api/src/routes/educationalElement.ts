import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';

import StoreEducationalElementAction from '../API/Http/Actions/EducationalElement/StoreEducationalElementAction';
//import UpdateEducationalElementAction from '../API/Http/Actions/EducationalElement/UpdateEducationalElementAction';
import IndexEducationalElementsAction from '../API/Http/Actions/EducationalElement/IndexEducationalElementAction';
//import ShowEducationalElementAction from '../API/Http/Actions/EducationalElement/ShowEducationalElementAction';
//import DestroyEducationalElementAction from '../API/Http/Actions/EducationalElement/DestroyEducationalElementAction';
//import ShowEducationalElementByNameAction from '../API/Http/Actions/EducationalElement/ShowEducationalElementByNameAction';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexEducationalElementAction: IndexEducationalElementsAction = DIContainer.resolve<
      IndexEducationalElementsAction
    >(IndexEducationalElementsAction);
    await indexEducationalElementAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal', 'user']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeEducationalElementAction: StoreEducationalElementAction = DIContainer.resolve<
      StoreEducationalElementAction
    >(StoreEducationalElementAction);
    await storeEducationalElementAction.execute(request, response);
  }),
);

// router.get(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showEducationalElementAction: ShowEducationalElementAction = DIContainer.resolve<ShowEducationalElementAction>(
//       ShowEducationalElementAction,
//     );
//     await showEducationalElementAction.execute(request, response);
//   }),
// );
//
// router.put(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const updateEducationalElementAction: UpdateEducationalElementAction = DIContainer.resolve<
//       UpdateEducationalElementAction
//     >(UpdateEducationalElementAction);
//     await updateEducationalElementAction.execute(request, response);
//   }),
// );
//
// router.get(
//   '/name/:name([a-z0-9-]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showEducationalElementByNameAction: ShowEducationalElementByNameAction = DIContainer.resolve<
//       ShowEducationalElementByNameAction
//     >(ShowEducationalElementByNameAction);
//     await showEducationalElementByNameAction.execute(request, response);
//   }),
// );
//
// router.delete(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const destroyEducationalElementAction: DestroyEducationalElementAction = DIContainer.resolve<
//       DestroyEducationalElementAction
//     >(DestroyEducationalElementAction);
//     await destroyEducationalElementAction.execute(request, response);
//   }),
// );

export default router;
