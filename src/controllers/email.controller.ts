import { Response, Request } from "express";
import { Inject, Service } from "typedi";
import { ResponseHandler } from "@perksforu/response";
import { Controller } from "@perksforu/app-core";
import { EmailService } from "@services/email.service";
import { SendEmailRequest, SendManyEmailRequest } from "@perksforu/core-notification-api-client";

@Service()
@Controller()
export class EmailController {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject() private emailService: EmailService) {}

  async notify(req: Request, res: Response) {
    const reqBody: SendEmailRequest = req.body;

    const result = await this.emailService.notify(reqBody);

    return ResponseHandler.ok(res, result);
  }

  async notifyMany(req: Request, res: Response) {
    const reqBody: SendManyEmailRequest = req.body;

    const result = await this.emailService.notifyMany(reqBody);

    return ResponseHandler.ok(res, result);
  }
}
