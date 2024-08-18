import express from "express";
import { Container } from "typedi";
import { RootController } from "@controllers/root.controller";

export default function () {
  const router = express.Router();
  const controller = Container.get(RootController);

  router.get("/", controller.home);

  router.get("/health", controller.healthCheck);

  return router;
}
