import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
// @ts-ignore
import {Strategy as VKontakteStrategy} from 'passport-vkontakte';

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
      return new BasicStrategy(this.verifyOld);
    } else if (name === 'VkontakteStrategy') {
      return new VKontakteStrategy(
        {
          clientID: '6434029',
          clientSecret: 'qeM8oImG1CgRkOWtrjxw',
          callbackURL: 'http://localhost:3000/verify',
        },
        this.verify,
      );
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

  verify(
    accessToken: string,
    refreshToken: string,
    // @ts-ignore
    params,
    // @ts-ignore
    profile,
    done: (err: Error | null, user?: UserProfile) => void,
  ) {
    done(null, profile);
    //   User.findOrCreate({ vkontakteId: profile.id })
    //       .then(function (user) { done(null, user); })
    //       .catch(done);
    // }
  }
}
