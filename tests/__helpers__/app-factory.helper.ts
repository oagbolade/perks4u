import express from "express";
import TestApp from "./test-app";

/**
 * @class AppFactory
 */
class AppFactory {
  static app: TestApp;

  static async create(): Promise<express.Application> {
    this.app = new TestApp(express(), Number(7002));
    await this.app.initialize();
    return this.app.engine;
  }

  static async destroy(): Promise<void> {
    await this.app.close();
  }
}

export default AppFactory;
