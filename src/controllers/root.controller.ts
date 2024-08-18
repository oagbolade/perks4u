import { Request, Response } from "express";
import { Service } from "typedi";
import { Controller } from "@perksforu/app-core";
import { ResponseHandler } from "@perksforu/response";

@Service()
@Controller()
export class RootController {
  /**
   * @method home
   * @param {Request} req
   * @param {Response} res
   */
  async home(req: Request, res: Response) {
    return ResponseHandler.ok(res, { message: `Welcome to PerksForU Notification Service!` });
  }

  /**
   * @method healthCheck
   * @param {Request} req
   * @param {Response} res
   */
  async healthCheck(req: Request, res: Response) {
    return ResponseHandler.ok(res, { status: "UP" });
  }
}
