import { Service } from "typedi";
import { ServiceAccount } from "firebase-admin";
import { Exceptions } from "@perksforu/response";
import configs from "./../configs";

@Service()
export class GetFirebaseKeysService {
  /**
   * @method getFirebaseKeys
   * @async
   * @returns {object}
   */
  getFirebaseKeys(): ServiceAccount {
    const buff = Buffer.from(configs.FIREBASE_SECURITY_KEYS, "base64");
    const keys = buff.toString("utf8");

    if (!keys?.length) {
      throw new Exceptions.UnprocessableError("Invalid Firebase credential");
    }

    return JSON.parse(keys);
  }
}
