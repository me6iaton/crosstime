import {ParsedRequest, ServerResponse} from '@loopback/rest';
import {Provider} from '@loopback/context';
import * as ExpressSession from 'express-session';
import {Request, Response} from 'express';
import {SessionBindings} from '../keys';

// export type SessionRequest = ParsedRequest & Express.Request;
// export type SessionResponse = ParsedRequest & Express.Request;

const SessionMiddleware = ExpressSession({
  secret: 'keyboard cat',
  cookie: {secure: false},
});

export interface AddSessionFn {
  (request: ParsedRequest, responce: ServerResponse): Promise<
    [ParsedRequest, ServerResponse]
  >;
}

export class SessionProvider implements Provider<AddSessionFn> {
  constructor() {}

  /**
   * @returns AddSessionFn
   */
  value(): AddSessionFn {
    return async (req: ParsedRequest, res: ServerResponse) => {
      return new Promise<[ParsedRequest, ServerResponse]>((resolve, reject) => {
        // @ts-ignore
        SessionMiddleware(req as Request, res as Response, err => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve([req, res]);
        });
      });
    };
  }
}

// /**\

//  * The implementation of authenticate() sequence action.
//  * @param strategy Passport strategy
//  * @param request Parsed Request
//  * @param setCurrentUser The setter function to update the current user
//  *   in the per-request Context
//  */
// async function authenticateRequest(
//   getStrategy: Getter<Strategy>,
//   request: ParsedRequest,
//   setCurrentUser: Setter<UserProfile>,
// ): Promise<UserProfile | undefined> {
//   const strategy = await getStrategy();
//   if (!strategy) {
//     // The invoked operation does not require authentication.
//     return undefined;
//   }
//   if (!strategy.authenticate) {
//     return Promise.reject(new Error('invalid strategy parameter'));
//   }
//   const strategyAdapter = new StrategyAdapter(strategy);
//   const user = await strategyAdapter.authenticate(request);
//   setCurrentUser(user);
//   return user;
// }
