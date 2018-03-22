import {inject} from '@loopback/core';
import {
  UserProfile,
  authenticate,
  AuthenticationBindings,
} from '@loopback/authentication';
import {get} from '@loopback/openapi-v3';

export class WhoAmIController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
  ) {}

  @authenticate('BasicStrategy')
  @get('/whoAmI')
  whoAmI() {
    return {
      id: this.user.id,
      name: this.user.name,
    };
  }
}
