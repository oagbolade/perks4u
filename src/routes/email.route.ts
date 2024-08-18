import express from "express";
import { Container } from "typedi";
import { EmailController } from "@controllers/email.controller";

export default function () {
  const router = express.Router();
  const controller = Container.get(EmailController);

  /**
   * @route       POST  /email/notify
   * @description Sends email notification
   */
  router.post("/notify", controller.notify);

  /**
   * @route       POST  /email/notify
   * @description Sends email notification
   */
  router.post("/notify-many", controller.notifyMany);

  return router;
}
