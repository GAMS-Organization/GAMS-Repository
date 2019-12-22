import { default as express, Router } from 'express';
import users from './users';
import auth from './auth';
import stock from './stock';
import products from './products';
import rooftoppers from './rooftoppers';
import sector from './sector';
import area from './area';
import element from './element';
import asset from './asset';
import entry from './entry';
import service from './service';
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

router.use('/product', products);

router.use('/stock', stock);

router.use('/entry', entry);

router.use('/sector', sector);

router.use('/area', area);

router.use('/element', element);

router.use('/asset', asset);

router.use('/service', service);

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
