import request from "supertest";
import { Application } from "express";
import { Constants as K } from "@perksforu/response";
import AppFactory from "../__helpers__/app-factory.helper";

let app: Application;

describe("POST /unknown-route", () => {
  beforeAll(async () => {
    app = await AppFactory.create();
  });

  afterAll(async () => {
    await AppFactory.destroy();
  });

  it("[404] - Send request to an undefined route", async () => {
    const res = await request(app).post(`/unknown-route`).send({}).expect(K.HttpStatusCode.NOT_FOUND);

    expect(res.body.message).toEqual("Method [POST] not found for route [/unknown-route]");
  });
});
