import {createClientForHandler, supertest} from '@loopback/testlab';
import {RestServer} from '@loopback/rest';
import {CrosstimeApplication} from '../';

describe('PingController', () => {
  let app: CrosstimeApplication;
  let server: RestServer;
  let client: supertest.SuperTest<supertest.Test>;

  before(givenAnApplication);

  before(givenARestServer);

  before(async () => {
    await app.boot();
    await app.start();
  });

  before(() => {
    client = createClientForHandler(server.requestHandler);
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    await client.get('/ping?msg=world').expect(200);
  });

  function givenAnApplication() {
    app = new CrosstimeApplication({
      rest: {port: 0},
      session: {
        secret: 'test',
      },
      auth: {
        vkontakte: {
          clientID: '6434029',
          clientSecret: 'qeM8oImG1CgRkOWtrjxw',
          callbackURL: 'http://localhost:3000/verify',
        },
      },
    });
  }

  async function givenARestServer() {
    server = await app.getServer(RestServer);
  }
});
