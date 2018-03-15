import {CrosstimeApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

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
