import webpush from "web-push";
import { Service } from "typedi";
import { Exceptions } from "@perksforu/response";
import {
  NotificationStatus,
  WebPushRegisterDeviceRequest,
  WebPushRequest,
  WebPushUnregisterDeviceRequest,
} from "@perksforu/core-notification-api-client";
import configs from "../configs";
import Notification from "../database/models/notification-model";
import WebPushDevice from "../database/models/web-push-device.model";
import { IWebPushDevice } from "../database/types/register-device-type";
import { INotificationStatus } from "../database/types/notification-status-type";

@Service()
export class WebPushService {
  constructor() {
    const publicVapidKey = configs.PUBLIC_VAPID_KEY;
    const privateVapidKey = configs.PRIVATE_VAPID_KEY;
    webpush.setVapidDetails(configs.WEB_PUSH_DOMAIN_EMAIL, publicVapidKey, privateVapidKey);
  }

  /**
   * Sends a web push notification to a registered user account
   * @param payload
   */
  async notify(payload: WebPushRequest): Promise<INotificationStatus> {
    const { userId, accountId, body, title, subtitle } = payload;
    const { endpoints, p256dh, auth } = (await WebPushDevice.findOne({ accountId })) || {};

    if (!auth) {
      throw new Exceptions.NotFoundError("User has not been registered for push notification");
    }

    const subscription = {
      endpoint: endpoints,
      expirationTime: null,
      keys: {
        p256dh,
        auth,
      },
    };

    const message = {
      body,
      title,
      subtitle,
    };

    try {
      await webpush.sendNotification(subscription, JSON.stringify(message));
      return await Notification.create({
        accountId,
        userId,
        title,
        body,
        subtitle,
        provider: "WEB-PUSH",
        status: NotificationStatus.SENT,
      });
    } catch (error) {
      throw new Exceptions.BadRequestError(error.body);
    }
  }

  async register(payload: WebPushRegisterDeviceRequest): Promise<IWebPushDevice> {
    const { userId, accountId, endpoints, auth, p256dh } = payload;
    return await WebPushDevice.create({
      userId,
      accountId,
      endpoints,
      auth,
      p256dh,
    });
  }

  async unregister(payload: WebPushUnregisterDeviceRequest): Promise<IWebPushDevice> {
    const { endpoints } = payload;
    return WebPushDevice.findOneAndSoftDelete({ endpoints });
  }

  async status(requestId: string): Promise<INotificationStatus> {
    return Notification.findOne({ _id: requestId });
  }
}
