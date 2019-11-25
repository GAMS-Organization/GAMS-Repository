import { default as express, Router } from 'express';
import users from './users';
import auth from './auth';
import products from './products';
import rooftoppers from './rooftoppers';
import educations from './educations';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import DIContainer from '../Infrastructure/DI/di.config';
import TrialAction from '../API/Http/Actions/TrialAction';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../utils/swagger.json';

const router = Router();

/* Users Routes */
router.use('/users', users);

router.use('/auth', auth);

router.use('/rooftopper-profiles', rooftoppers);

router.use('/educations', educations);

router.use('/product', products);

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get(
  '/',
  asyncMiddleware(async (_request: express.Request, response: express.Response) => {
    response.end('Hello!');
  }),
);

router.get(
  '/tuvieja',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeUsersAction: TrialAction = DIContainer.resolve<TrialAction>(TrialAction);
    await storeUsersAction.execute(request, response);
  }),
);

export default router;