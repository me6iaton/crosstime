import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {CoreBindings} from '@loopback/core';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {ApplicationConfig} from '../config.type';
// @ts-ignore
import {Strategy as VKontakteStrategy} from 'passport-vkontakte';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @inject(CoreBindings.APPLICATION_CONFIG)
    private readonly config: ApplicationConfig,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verifyOld);
    } else if (name === 'VkontakteStrategy') {
      return new VKontakteStrategy(this.config.auth.vkontakte, this.verify);
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verifyOld(
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) {
    console.log('verify test');
    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
    if (username && password) {
      console.log(`
      /Users/me6iaton/Projects/js/loopback/crosstime/src/providers/auth-strategy.ts:
       verify username: ${username} password:${password}
      `);
      cb(null, {id: '1', name: username});
    } else {
      cb(null, false);
    }
  }

  verify(
    accessToken: string,
    refreshToken: string,
    params: ApplicationConfig['auth']['vkontakte'],
    // @ts-ignore
    profile,
    done: (err: Error | null, user?: UserProfile) => void,
  ) {
    // @ts-ignore // @ts-ignore
    done(null, profile);
    //   User.findOrCreate({ vkontakteId: profile.id })
    //       .then(function (user) { done(null, user); })
    //       .catch(done);
    // }
  }

  // function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {

  //   // Now that we have user's `profile` as seen by VK, we can
  //   // use it to find corresponding database records on our side.
  //   // Also we have user's `params` that contains email address (if set in
  //   // scope), token lifetime, etc.
  //   // Here, we have a hypothetical `User` class which does what it says.
  //   User.findOrCreate({ vkontakteId: profile.id })
  //       .then(function (user) { done(null, user); })
  //       .catch(done);
  // }
}
