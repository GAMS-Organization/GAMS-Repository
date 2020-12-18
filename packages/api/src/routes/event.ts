import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';
import { authMiddleware } from '../config/authMiddleware';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import StoreEventAction from '../API/Http/Actions/Event/StoreEventAction';
import IndexEventAction from '../API/Http/Actions/Event/IndexEventAction';
import UpdateEventAction from '../API/Http/Actions/Event/UpdateEventAction';
import IndexEventsByMonthAction from '../API/Http/Actions/Event/IndexEventsByMonthAction';
import DestroyEventAction from '../API/Http/Actions/Event/DestroyEventAction';

const router = express.Router();

router.get(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexEventAction: IndexEventAction = DIContainer.resolve<IndexEventAction>(IndexEventAction);
    await indexEventAction.execute(request, response);
  }),
);

router.post(
  '/',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeEventAction: StoreEventAction = DIContainer.resolve<StoreEventAction>(StoreEventAction);
    await storeEventAction.execute(request, response);
  }),
);

// router.get(
//   '/:id([0-9]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showProductAction: ShowProductAction = DIContainer.resolve<ShowProductAction>(ShowProductAction);
//     await showProductAction.execute(request, response);
//   }),
// );
//

router.get(
  '/:month([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const indexEventsByMonth: IndexEventsByMonthAction = DIContainer.resolve<IndexEventsByMonthAction>(
      IndexEventsByMonthAction,
    );
    await indexEventsByMonth.execute(request, response);
  }),
);

router.put(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const updateEventAction: UpdateEventAction = DIContainer.resolve<UpdateEventAction>(UpdateEventAction);
    await updateEventAction.execute(request, response);
  }),
);
//
// router.get(
//   '/name/:name([a-z0-9-]+)',
//   (req, res, next): void => {
//     authMiddleware(req, res, next, ['admin', 'personal']);
//   },
//   asyncMiddleware(async (request: express.Request, response: express.Response) => {
//     const showProductByNameAction: ShowProductByNameAction = DIContainer.resolve<ShowProductByNameAction>(
//       ShowProductByNameAction,
//     );
//     await showProductByNameAction.execute(request, response);
//   }),
// );
//
router.delete(
  '/:id([0-9]+)',
  (req, res, next): void => {
    authMiddleware(req, res, next, ['admin', 'personal']);
  },
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const destroyEventAction: DestroyEventAction = DIContainer.resolve<DestroyEventAction>(DestroyEventAction);
    await destroyEventAction.execute(request, response);
  }),
);

export default router;
