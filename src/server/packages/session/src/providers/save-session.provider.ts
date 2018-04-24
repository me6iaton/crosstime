import {Context, Provider, Setter, inject} from '@loopback/context';
import {ParsedRequest, RestBindings, ServerResponse} from '@loopback/rest';
import {Request, RequestHandler, Response} from 'express';
import {SessionBindings} from '../keys';

export interface SaveSessionFn {
  (): Promise<undefined>;
}

export class SaveSessionActionProvider implements Provider<SaveSessionFn> {
  constructor(@inject(RestBindings.Http.CONTEXT) public ctx: Context) {}

  /**
   * @returns addSessionFn
   */
  value(): SaveSessionFn {
    return () => this.action();
  }

  /**
   * The implementation of addSession() sequence action.
   */
  async action(): Promise<undefined> {
    return new Promise<undefined>((resolve, reject) => {
      const mockRes = this.ctx.getSync(SessionBindings.MOCK_RESPONSE);
      mockRes.writeHead();
      mockRes.end();
      resolve();
    });
  }
}
