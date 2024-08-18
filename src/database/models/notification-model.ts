import crypto from "crypto";
import { model, Schema } from "mongoose";
import { NotificationStatus } from "@perksforu/core-notification-api-client";
import { INotificationStatus } from "../types/notification-status-type";

const NotificationSchema = new Schema(
  {
    _id: {
      type: Schema.Types.UUID,
      default: () => crypto.randomUUID(),
    },
    provider: {
      type: String,
      enum: ["APP-PUSH", "WEB-PUSH"],
      required: false,
    },
    userId: {
      type: Schema.Types.UUID,
      required: false,
    },
    accountId: {
      type: Schema.Types.UUID,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.keys(NotificationStatus),
    },
    requestedAt: {
      type: Schema.Types.Date,
      required: false,
    },
    sentAt: {
      type: Schema.Types.Date,
      required: false,
    },
    deliveredAt: {
      type: Schema.Types.Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: function (doc: any, ret: any) {
        delete ret._id;
        ret.id = doc._id;
      },
    },
  },
);

NotificationSchema.index({ accountId: 1 });

export default model<INotificationStatus>("NotificationStatus", NotificationSchema, "notifications");
