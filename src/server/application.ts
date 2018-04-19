import {
  AuthenticationComponent,
  AuthenticationBindings,
} from './packages/authentication';
import {SessionComponent} from './packages/session';
import {ApplicationConfig} from './config.type';
import {RestApplication, RestServer} from '@loopback/rest';
import {MyAuthStrategyProvider} from './providers/auth-strategy';
import {MySequence} from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import {BootMixin, Booter, Binding} from '@loopback/boot';
/* tslint:enable:no-unused-variable */

export class CrosstimeApplication extends BootMixin(RestApplication) {
  constructor(options?: ApplicationConfig) {
    super(options);

    this.component(SessionComponent);
    this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.STRATEGY).toProvider(
      MyAuthStrategyProvider,
    );

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get('rest.port');
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
    console.log(`
      You can try your authentication component by using your favourite REST client
      and by setting the authorization header. Here is an example of what your
      request might look like using curl:
      curl -X GET \
        http://localhost:${port}/whoami \
        -H 'authorization: Basic Zm9vOmJhcg=='
    `);
  }
}
