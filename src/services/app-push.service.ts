import { Inject, Service } from "typedi";
import * as admin from "firebase-admin";
import {
  RegisterDeviceRequest,
  SendPushRequest,
  UnregisterDeviceRequest,
} from "@perksforu/core-notification-api-client";
import { Exceptions } from "@perksforu/response";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import configs from "../configs";
import Notification from "../database/models/notification-model";
import AppPushDevice from "../database/models/app-push-device.model";
import { GetFirebaseKeysService } from "@services/firebase-keys.service";
import { IAppPushDevice } from "../database/types/register-device-type";
import { INotificationStatus } from "../database/types/notification-status-type";

@Service()
export class AppPushService {
  constructor(@Inject() private keys: GetFirebaseKeysService) {
    initializeApp({
      credential: admin.credential.cert(this.keys.getFirebaseKeys()),
      projectId: configs.FIREBASE_PROJECT_ID,
    });
  }
  /**
   * Sends a push notification to a registered device
   * @param payload
   */
  async notify(payload: SendPushRequest): Promise<INotificationStatus> {
    const { userId, title, body, subtitle } = payload;
    const { token } = (await AppPushDevice.findOne({ userId })) || {};

    if (!token) {
      throw new Exceptions.NotFoundError("User has not been registered for push notification");
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      await getMessaging().send(message);
      return await Notification.create({
        userId,
        title,
        body,
        subtitle,
        token,
        provider: "APP-PUSH",
        status: "SENT",
      });
    } catch (error) {
      throw new Exceptions.BadRequestError(error);
    }
  }

  /**
   * Registers a device
   * @param payload
   */
  async register(payload: RegisterDeviceRequest): Promise<IAppPushDevice> {
    const { userId, accountId, token } = payload;
    return await AppPushDevice.create({
      userId,
      token,
      accountId,
    });
  }

  async unregister(payload: UnregisterDeviceRequest): Promise<IAppPushDevice> {
    const { token } = payload;
    return AppPushDevice.findOneAndSoftDelete({ token });
  }

  async status(requestId: string): Promise<INotificationStatus> {
    return await Notification.findOne({ _id: requestId });
  }
}
