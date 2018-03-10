'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', {value: true});
const testlab_1 = require('@loopback/testlab');
const rest_1 = require('@loopback/rest');
const _1 = require('../');
describe('PingController', () => {
  let app;
  let server;
  let client;
  before(givenAnApplication);
  before(givenARestServer);
  before(() =>
    __awaiter(this, void 0, void 0, function*() {
      yield app.boot();
      yield app.start();
    }),
  );
  before(() => {
    client = testlab_1.createClientForHandler(server.handleHttp);
  });
  after(() =>
    __awaiter(this, void 0, void 0, function*() {
      yield app.stop();
    }),
  );
  it('invokes GET /ping', () =>
    __awaiter(this, void 0, void 0, function*() {
      yield client.get('/ping?msg=world').expect(200);
    }));
  function givenAnApplication() {
    app = new _1.CrosstimeApplication({
      rest: {
        port: 0,
      },
    });
  }
  function givenARestServer() {
    return __awaiter(this, void 0, void 0, function*() {
      server = yield app.getServer(rest_1.RestServer);
    });
  }
});
//# sourceMappingURL=ping.controller.test.js.map
