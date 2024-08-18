import App from "../../src/app";

/**
 * @class TestApp
 */
export default class TestApp extends App {
  async close() {
    await super.close(false);
  }

  protected async setupDependencies(): Promise<void> {
    // Mock DB and cache setup goes here
  }

  async checkDependencies(): Promise<void> {
    // Mock DB and cache checks goes here
  }
}
