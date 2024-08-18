import { Response, Request } from "express";
import { Inject, Service } from "typedi";
import { ResponseHandler } from "@perksforu/response";
import { Controller } from "@perksforu/app-core";
import {
  WebPushUnregisterDeviceRequest,
  WebPushRegisterDeviceRequest,
  WebPushRegisterDeviceResponse,
  WebPushRequest,
  WebPushResponse,
  NotificationStatusObject,
} from "@perksforu/core-notification-api-client";
import { WebPushService } from "@services/web-push.service";
import { ResponseMapper } from "../mappers/response.mapper";

@Service()
@Controller()
export class WebPushController {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject() private webPushService: WebPushService) {}

  async notify(req: Request, res: Response) {
    const reqBody: WebPushRequest = req.body;

    const notify = await this.webPushService.notify(reqBody);

    return ResponseHandler.ok<WebPushResponse>(res, ResponseMapper.toWebNotificationStatusResponse(notify));
  }

  async register(req: Request, res: Response) {
    const reqBody: WebPushRegisterDeviceRequest = req.body;

    const registeredDevice = await this.webPushService.register(reqBody);

    return ResponseHandler.created<WebPushRegisterDeviceResponse>(
      res,
      ResponseMapper.toWebPushDeviceResponse(registeredDevice),
    );
  }

  async unregister(req: Request, res: Response) {
    const reqBody: WebPushUnregisterDeviceRequest = req.body;

    const unregisteredDevice = await this.webPushService.unregister(reqBody);

    return ResponseHandler.ok<WebPushRegisterDeviceResponse>(
      res,
      ResponseMapper.toWebPushDeviceResponse(unregisteredDevice),
    );
  }

  async status(req: Request, res: Response) {
    const { requestId } = req.params;

    const status = await this.webPushService.status(requestId);

    return ResponseHandler.ok<NotificationStatusObject>(res, ResponseMapper.toNotificationStatusResponse(status));
  }
}
