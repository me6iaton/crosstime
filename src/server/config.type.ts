import {RestServerConfig} from '@loopback/rest';
import {SessionConfig} from './packages/session';

/**
 * Configuration for application
 */
export interface ApplicationConfig {
  rest?: RestServerConfig;
  session: SessionConfig;
  /**
   * Other properties
   */
  // tslint:disable-next-line:no-any
  [prop: string]: any;
}
