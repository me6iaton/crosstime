import {Context, inject} from '@loopback/core';
import {
  RestBindings,
  SequenceHandler,
  FindRoute,
  ParsedRequest,
  ParseParams,
  InvokeMethod,
  Send,
  ServerResponse,
  Reject,
} from '@loopback/rest';
import {
  AuthenticateFn,
  AuthenticationBindings,
} from './packages/authentication';
import {AddSessionFn, SessionBindings} from './packages/session';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(RestBindings.Http.CONTEXT) public ctx: Context,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION) protected auth: AuthenticateFn,
    @inject(SessionBindings.SESSION_ACTION) protected addSession: AddSessionFn,
  ) {}

  async handle(req: ParsedRequest, res: ServerResponse) {
    try {
      // type reqWithSession = ParsedRequest & {session?: string};
      // interface reqWithSession extends ParsedRequest {
      //   session?: string;
      // }

      // let clone = {...req} as reqWithSession;
      // Object.setPrototypeOf(clone, Object.getPrototypeOf(req));
      // clone.session = 'test';

      // let clone: reqWithSession = Object.create(req);
      // clone.session = 'test';

      const route = this.findRoute(req);
      const [sReq, sRes] = await this.addSession(req, res);

      await this.auth(sReq, sRes); // check authenticate
      const args = await this.parseParams(sReq, route);
      const result = await this.invoke(route, args);
      this.send(sRes, result);
    } catch (err) {
      this.reject(res, req, err);
    }
  }
}
