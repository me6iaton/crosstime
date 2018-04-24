import {Context, Provider, inject} from '@loopback/context';
import {ParsedRequest, RestBindings, ServerResponse} from '@loopback/rest';
import {Request, RequestHandler, Response} from 'express';
import * as ExpressSession from 'express-session';
import {SessionBindings} from '../keys';

export interface SessionRequest {
  session: Express.Session;
  sessionID: string;
  sessionStore: ExpressSession.Store;
}

export interface MabySessionRequest extends ParsedRequest {
  session?: Express.Session;
  sessionID?: string;
  sessionStore?: ExpressSession.Store;
}

export interface AddSessionFn {
  (request: ParsedRequest, responce: ServerResponse): Promise<Express.Session>;
}

export class MockServerResponse {
  end: () => void;
  write: () => void;
  writeHead: () => void;
  constructor(res: ServerResponse) {
    Object.setPrototypeOf(this, res);
    this.end = () => {};
    this.write = () => {};
    this.writeHead = () => {};
  }
}

export class AddSessionActionProvider implements Provider<AddSessionFn> {
  constructor(
    @inject(RestBindings.Http.CONTEXT) public ctx: Context,
    @inject(SessionBindings.MIDDLEWARE)
    private sessionMiddleware: RequestHandler,
  ) {}

  /**
   * @returns addSessionFn
   */
  value(): AddSessionFn {
    return (request, responce) => this.action(request, responce);
  }

  /**
   * The implementation of addSession() sequence action.
   */
  async action(
    req: MabySessionRequest,
    res: ServerResponse,
  ): Promise<Express.Session> {
    const self = this;
    return new Promise<Express.Session>((resolve, reject) => {
      const mockRes = new MockServerResponse(res);
      // tslint:disable:no-any
      self.sessionMiddleware(
        (req as any) as Request,
        (mockRes as any) as Response,
        err => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (req.session && req.sessionID && req.sessionStore) {
              self.ctx.bind(SessionBindings.REQUEST).to({
                session: req.session,
                sessionID: req.sessionID,
                sessionStore: req.sessionStore,
              });
              self.ctx.bind(SessionBindings.MOCK_RESPONSE).to(mockRes);
              resolve(req.session);
            } else {
              reject(new Error('session not found'));
            }
          }
        },
      );
      // tslint:enable:no-any
    });
  }
}
