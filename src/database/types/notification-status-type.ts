import { Document } from "mongoose";
import { NotificationStatus } from "@perksforu/core-notification-api-client";

/**
 * @interface INotificationStatus
 */
export interface INotificationStatus extends Document {
  _id: string;
  userId: string;
  accountId: string;
  title: string;
  subtitle: string;
  body: string;
  status: NotificationStatus;
  createdAt: Date;
  sentAt: Date;
  requestedAt: Date;
  deliveredAt: Date;
}
