import crypto from "crypto";
import { model, Schema } from "mongoose";
import { IAppPushDevice } from "../types/register-device-type";
import { ISoftDeleteModel, softDeletePlugin } from "@perksforu/app-core";

const AppPushDeviceSchema = new Schema(
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
    token: {
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

AppPushDeviceSchema.plugin(softDeletePlugin);
export default model<IAppPushDevice, ISoftDeleteModel<IAppPushDevice>>(
  "AppPushDevice",
  AppPushDeviceSchema,
  "app_push_devices",
);
