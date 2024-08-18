import { Document } from "mongoose";

/**
 * @interface IAppPushDevice
 */
export interface IAppPushDevice extends Document {
  _id: string;
  userId: string;
  accountId: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface IWebPushDevice
 */
export interface IWebPushDevice extends Document {
  _id: string;
  userId: string;
  accountId?: string;
  endpoints: Date;
  auth: string;
  p256dh: Date;
}
