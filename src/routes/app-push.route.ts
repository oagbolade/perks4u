import express from "express";
import { Container } from "typedi";
import { AppPushController } from "@controllers/app-push.controller";
import { TokenVerifier } from "@perksforu/auth-verifier";

export default function () {
  const verifier = TokenVerifier.getInstance();
  const router = express.Router();
  const controller = Container.get(AppPushController);

  /**
   * @route       POST  /app-push/register
   * @description Register token for app push notification
   */
  router.post("/register", verifier.requiresServiceScope(["register"]), controller.register);

  /**
   * @route       POST  /app-push/unregister
   * @description Unregister token from app push notification
   */
  router.post("/unregister", verifier.requiresServiceScope(["update"]), controller.unregister);

  /**
   * @route       POST  /app-push/notify
   * @description Sends app push notification
   */
  router.post("/notify", verifier.requiresServiceScope(), controller.notify);

  /**
   * @route       GET  /app-push/:requestId/status
   * @description Get push notification status
   */
  router.get("/:requestId/status", verifier.isAuthenticatedService(), controller.status);

  return router;
}
