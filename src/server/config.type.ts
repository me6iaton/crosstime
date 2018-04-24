import {RestServerConfig} from '@loopback/rest';
import {SessionConfig} from './packages/session';

/**
 * Configuration for application
 */
export interface ApplicationConfig {
  rest?: RestServerConfig;
  session: SessionConfig;
  auth: {
    vkontakte: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
      profileFields?: [string];
      apiVersion?: string;
      lang?: string;
      photoSize?: number;
    };
  };
  /**
   * Other properties
   */
  // tslint:disable-next-line:no-any
  [prop: string]: any;
}
