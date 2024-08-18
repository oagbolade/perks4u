import express from "express";
import { Container } from "typedi";
import { WebPushController } from "@controllers/web-push.controller";

export default function () {
  const router = express.Router();
  const controller = Container.get(WebPushController);

  /**
   * @route       POST  /web-push/notify
   * @description Sends web push notification
   */
  router.post("/notify", controller.notify);

  /**
   * @route       POST  /web-push/register
   * @description Register user for web push notification
   */
  router.post("/register", controller.register);

  /**
   * @route       POST  /web-push/unregister
   * @description Unregister user from web push notification
   */
  router.post("/unregister", controller.unregister);

  /**
   * @route       GET  /web-push/status
   * @description Get web push notification status
   */
  router.get("/status", controller.status);

  return router;
}
