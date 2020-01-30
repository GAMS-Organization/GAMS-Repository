import { default as express, Router } from 'express';
import users from './users';
import auth from './auth';
import stock from './stock';
import products from './products';
import entry from './entry';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';

const router = Router();

/* Users Routes */
router.use('/users', users);

router.use('/auth', auth);

router.use('/product', products);

router.use('/stock', stock);

router.use('/entry', entry);

router.get(
  '/',
  asyncMiddleware(async (_request: express.Request, response: express.Response) => {
    response.end('Hello!');
  }),
);

export default router;
