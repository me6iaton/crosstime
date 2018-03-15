import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';

import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify(username: string, password: string, cb: Function) {
    console.log('verify test');

    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, userProfile) when user is authenticated
    if (username && password) {
      console.log(`
      /Users/me6iaton/Projects/js/loopback/crosstime/src/providers/auth-strategy.ts:
       verify username: ${username} password:${password}
      `);
      cb(null, {
        id: '1',
        name: username,
      });
    } else {
      cb(null, false);
    }
  }
}
