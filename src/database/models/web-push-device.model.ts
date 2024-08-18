import crypto from "crypto";
import { model, Schema } from "mongoose";
import { IWebPushDevice } from "../types/register-device-type";
import { ISoftDeleteModel, softDeletePlugin } from "@perksforu/app-core";

const WebPushSchema = new Schema(
  {
    _id: {
      type: Schema.Types.UUID,
      default: () => crypto.randomUUID(),
    },
    userId: {
      type: Schema.Types.UUID,
      required: false,
    },
    accountId: {
      type: Schema.Types.UUID,
      required: true,
    },
    endpoints: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    auth: {
      type: Schema.Types.String,
      required: true,
    },
    p256dh: {
      type: Schema.Types.String,
      required: true,
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

WebPushSchema.plugin(softDeletePlugin);
export default model<IWebPushDevice, ISoftDeleteModel<IWebPushDevice>>(
  "WebPushDevice",
  WebPushSchema,
  "web_push_devices",
);
