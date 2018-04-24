import {SessionBindings} from './keys';
import {Component, ProviderMap} from '@loopback/core';
import {Setter, inject} from '@loopback/context';
import {AddSessionActionProvider, SaveSessionActionProvider} from './providers';
import {RequestHandler} from 'express';
import {SessionOptions} from 'express-session';
import * as ExpressSession from 'express-session';

const SessionActions = SessionBindings.SessionActions;

export class SessionComponent implements Component {
  providers?: ProviderMap;

  constructor(
    @inject(SessionBindings.CONFIG) config: SessionOptions,
    @inject.setter(SessionBindings.MIDDLEWARE)
    private readonly setSessionMiddleware: Setter<RequestHandler>,
  ) {
    this.providers = {
      [SessionActions.ADD.key]: AddSessionActionProvider,
      [SessionActions.SAVE.key]: SaveSessionActionProvider,
    };
    this.setSessionMiddleware(ExpressSession(config));
  }
}

export {SessionOptions as SessionConfig};
