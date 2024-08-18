import request from "supertest";
import { Application } from "express";
import { Constants as K } from "@perksforu/response";
import AppFactory from "../__helpers__/app-factory.helper";

let app: Application;

describe("GET /health", () => {
  beforeAll(async () => {
    app = await AppFactory.create();
  });

  afterAll(async () => {
    await AppFactory.destroy();
  });

  it("[200] - Check that /health route is UP & running", async () => {
    const res = await request(app).get(`/health`).send({}).expect(K.HttpStatusCode.OK);

    expect(res.body.status).toEqual("UP");
  });
});
