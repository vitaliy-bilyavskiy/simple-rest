import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import { loadRoutes } from './routing';
import { ServerUtils } from './utils/server.utils';

const SERVER_PORT = 3002;

(async () => {
  const app = new Koa();
  const router = loadRoutes();

  app.use(cors());
  app.use(bodyParser());

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(SERVER_PORT);

  console.log(`
      Server listening on:
          http://localhost:${SERVER_PORT}
          http://${ServerUtils.getLocalIPv4()}:${SERVER_PORT}
  `);
})();
