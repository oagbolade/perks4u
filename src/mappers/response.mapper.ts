import {
  RegisterDeviceResponse,
  SendPushResponse,
  WebPushRegisterDeviceResponse,
  WebPushResponse,
} from "@perksforu/core-notification-api-client";
import { INotificationStatus } from "../database/types/notification-status-type";
import { IAppPushDevice, IWebPushDevice } from "../database/types/register-device-type";

export class ResponseMapper {
  static toAppPushDeviceResponse(registeredDevice: IAppPushDevice): RegisterDeviceResponse {
    return {
      registrationId: registeredDevice._id,
      userId: registeredDevice.userId,
      token: registeredDevice.token,
    };
  }

  static toWebPushDeviceResponse(registeredDevice: IWebPushDevice): WebPushRegisterDeviceResponse {
    return {
      registrationId: registeredDevice._id,
      userId: registeredDevice.userId,
      accountId: registeredDevice.accountId,
    };
  }

  static toNotificationStatusResponse(status: INotificationStatus): SendPushResponse {
    return {
      body: status.body,
      title: status.title,
      subtitle: status.subtitle,
      userId: status.userId,
    };
  }

  static toWebNotificationStatusResponse(status: INotificationStatus): WebPushResponse {
    return {
      body: status.body,
      title: status.title,
      subtitle: status.subtitle,
    };
  }
}
