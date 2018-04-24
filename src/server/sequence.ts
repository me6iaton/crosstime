import {Context, inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  ParsedRequest,
  Reject,
  RestBindings,
  Send,
  SequenceHandler,
  ServerResponse,
} from '@loopback/rest';
import {
  AuthenticateFn,
  AuthenticationBindings,
} from './packages/authentication';
import {AddSessionFn, SessionBindings, SaveSessionFn} from './packages/session';

const SequenceActions = RestBindings.SequenceActions;
const SessionActions = SessionBindings.SessionActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(RestBindings.Http.CONTEXT) public ctx: Context,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION) protected auth: AuthenticateFn,
    @inject(SessionActions.ADD) protected addSession: AddSessionFn,
    @inject(SessionActions.SAVE) protected saveSession: SaveSessionFn,
  ) {}

  async handle(req: ParsedRequest, res: ServerResponse) {
    try {
      const route = this.findRoute(req);
      const session = await this.addSession(req, res); // add session
      const user = await this.auth(req, res, session); // check authenticate
      const args = await this.parseParams(req, route);
      const result = await this.invoke(route, args);
      await this.saveSession(); // save session
      this.send(res, result);
    } catch (err) {
      this.reject(res, req, err);
    }
  }
}
