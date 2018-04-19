import {SessionBindings} from './keys';
import {Component, ProviderMap} from '@loopback/core';
import {SessionProvider} from './providers/session';
import {SessionOptions} from 'express-session';

export class SessionComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {[SessionBindings.SESSION_ACTION]: SessionProvider};
  }
}

export {SessionOptions as SessionConfig};
