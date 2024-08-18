import { Application } from "express";
import { AbstractApp, IAppOptions, MongoDBManager } from "@perksforu/app-core";
import { ServiceAuthenticator } from "@perksforu/service-authenticator";
import configs from "./configs";
import RouteManager from "./routes";

/**
 * @class App
 * @extends AbstractApp
 */
export default class App extends AbstractApp {
  //eslint-disable-next-line no-useless-constructor
  constructor(engine: Application, port: number, options?: IAppOptions) {
    super(engine, port, options);
  }

  /**
   * @method setupDependencies
   * @instance
   * @returns {Promise<void>}
   */
  protected async setupDependencies(): Promise<void> {
    // All setup required for the app goes here. DB, Redis, PubSub e.t.c
    // Set up Mongo DB
    await MongoDBManager.connect(configs.DB_CONNECTION_URL);

    // Configure service authenticator
    ServiceAuthenticator.init({ authId: configs.SERVICE_AUTH_ID, authSecret: configs.SERVICE_AUTH_SECRET });
  }

  /**
   * @method checkDependencies
   * @instance
   */
  checkDependencies(): void {
    // All method to verify dependencies and their availability goes here
    MongoDBManager.checkConnection();
  }

  /**
   * @method installRoutes
   * @instance
   * @protected
   */
  protected installRoutes(): void {
    RouteManager.installRoutes(this.engine);
  }

  /**
   * @method close
   * @instance
   * @async
   * @param {boolean} closeDataStores
   */
  async close(closeDataStores: boolean = true) {
    // All method to close any DB and connection goes here before the super call
    await MongoDBManager.disconnect();
    super.close();
  }
}
