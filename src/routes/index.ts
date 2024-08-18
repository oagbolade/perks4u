import path from "path";
import { Application } from "express";
import { apiRequestValidator, notFoundHandler } from "@perksforu/app-core";
import root from "./root.route";
import emailRoute from "./email.route";
import appPushNotificationRoute from "./app-push.route";
import webPushRoute from "./web-push.route";

const API_SPEC_PATH: string = path.resolve(__dirname, "../../spec/api-spec.yml");

/**
 * @class RouteManager
 */
export default class RouteManager {
  /**
   * @name installRoutes
   * @static
   * @param {Application} app
   */
  static installRoutes(app: Application) {
    app.use(apiRequestValidator(API_SPEC_PATH));
    app.use(root());
    app.use("/email", emailRoute());
    app.use("/app-push", appPushNotificationRoute());
    app.use("/web-push", webPushRoute());
    app.use(notFoundHandler);
  }
}
