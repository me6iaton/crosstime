/**
 * Binding keys used by this component.
 */

import {BindingKey} from '@loopback/context';
import {CoreBindings} from '@loopback/core';
import {RequestHandler} from 'express';
import {
  AddSessionFn,
  SessionRequest,
  MockServerResponse,
} from './providers/add-session.provider';
import {SaveSessionFn} from './providers/save-session.provider';
import {SessionConfig} from './session-component';

const APPLICATION_CONFIG = CoreBindings.APPLICATION_CONFIG;

export namespace SessionBindings {
  export const CONFIG = APPLICATION_CONFIG.deepProperty<SessionConfig>(
    'session',
  );
  export const MIDDLEWARE = BindingKey.create<RequestHandler>(
    'session.middleware',
  );
  export const REQUEST = BindingKey.create<SessionRequest>('session.request');
  export const MOCK_RESPONSE = BindingKey.create<MockServerResponse>(
    'session.mockResponse',
  );
  export namespace SessionActions {
    export const ADD = BindingKey.create<AddSessionFn>('session.actions.add');
    export const SAVE = BindingKey.create<SaveSessionFn>(
      'session.actions.save',
    );
  }
}
