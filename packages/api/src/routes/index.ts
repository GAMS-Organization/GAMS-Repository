import { default as express, Router } from 'express';
import users from './users';
import auth from './auth';
import stock from './stock';
import products from './products';
import sector from './sector';
import area from './area';
import element from './element';
import asset from './asset';
import entry from './entry';
import departure from './departure';
import service from './service';
import workOrder from './workOrder';
import event from './event';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = Router();

/* Users Routes */
router.use('/users', users);

router.use('/auth', auth);

router.use('/product', products);

router.use('/stock', stock);

router.use('/entry', entry);

router.use('/departure', departure);

router.use('/sector', sector);

router.use('/area', area);

router.use('/element', element);

router.use('/asset', asset);

router.use('/service', service);

router.use('/workOrder', workOrder);

router.use('/event', event);

router.get(
  '/',
  asyncMiddleware(async (_request: express.Request, response: express.Response) => {
    response.end('Hello!');
  }),
);

export default router;
