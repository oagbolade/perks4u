import { Response, Request } from "express";
import { Inject, Service } from "typedi";
import { ResponseHandler } from "@perksforu/response";
import { Controller } from "@perksforu/app-core";
import { AppPushService } from "@services/app-push.service";
import {
  RegisterDeviceRequest,
  SendPushRequest,
  UnregisterDeviceRequest,
  RegisterDeviceResponse,
  SendPushResponse,
  NotificationStatusObject,
} from "@perksforu/core-notification-api-client";
import { ResponseMapper } from "../mappers/response.mapper";

@Service()
@Controller()
export class AppPushController {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject() private appPushService: AppPushService) {}

  async notify(req: Request, res: Response) {
    const reqBody: SendPushRequest = req.body;

    const notify = await this.appPushService.notify(reqBody);
    const response = {
      success: true,
      message: "Notification sent successfully",
      ...ResponseMapper.toNotificationStatusResponse(notify),
    };

    return ResponseHandler.ok<SendPushResponse>(res, response);
  }

  async register(req: Request, res: Response) {
    const reqBody: RegisterDeviceRequest = req.body;

    const registeredDevice = await this.appPushService.register(reqBody);

    return ResponseHandler.created<RegisterDeviceResponse>(
      res,
      ResponseMapper.toAppPushDeviceResponse(registeredDevice),
    );
  }

  async unregister(req: Request, res: Response) {
    const reqBody: UnregisterDeviceRequest = req.body;

    const unregisteredDevice = await this.appPushService.unregister(reqBody);

    return ResponseHandler.ok<RegisterDeviceResponse>(res, ResponseMapper.toAppPushDeviceResponse(unregisteredDevice));
  }

  async status(req: Request, res: Response) {
    const { requestId } = req.params;

    const status = await this.appPushService.status(requestId);

    return ResponseHandler.ok<NotificationStatusObject>(res, ResponseMapper.toNotificationStatusResponse(status));
  }
}
