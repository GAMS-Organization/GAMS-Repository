import * as express from 'express';
import DIContainer from '../Infrastructure/DI/di.config';
import { asyncMiddleware } from '../API/Http/Middleware/AsyncMiddleware';
import LoginAction from '../API/Http/Actions/Auth/LoginAction';

const router = express.Router();

router.post(
  '/login',
  asyncMiddleware(async (request: express.Request, response: express.Response) => {
    const storeUsersAction: LoginAction = DIContainer.resolve<LoginAction>(LoginAction);
    await storeUsersAction.execute(request, response);
  }),
);

export default router;
