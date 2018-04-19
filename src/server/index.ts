import {CrosstimeApplication} from './application';
import {ApplicationConfig} from './config.type';
import {RestBindings} from '@loopback/rest';

export {CrosstimeApplication};

export async function main(options?: ApplicationConfig) {
  const app = new CrosstimeApplication(options);

  try {
    await app.boot();
    await app.start();
  } catch (err) {
    console.error(`Unable to start application: ${err}`);
  }
  return app;
}
