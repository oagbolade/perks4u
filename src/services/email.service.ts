import { Service } from "typedi";
import { Exceptions } from "@perksforu/response";
import configs from "../configs";
import sgMail, { ClientResponse, ResponseError } from "@sendgrid/mail";
import { SendEmailRequest, SendManyEmailRequest } from "@perksforu/core-notification-api-client";

@Service()
export class EmailService {
  constructor() {
    sgMail.setApiKey(configs.SENDGRID_API_KEY);
  }
  /**
   * Sends an email using sendgrid
   * @param payload
   */
  async notify(payload: SendEmailRequest) {
    const { subject, body, recipient, sender, senderName, template, templateData } = payload;
    if (!template && !body) {
      throw new Exceptions.BadRequestError("The payload body or template parameters must be provided");
    }
    const msg: any = {
      to: {
        ...recipient,
      },
      from: {
        email: sender || configs.DEFAULT_SENDER_EMAIL,
        name: senderName || configs.DEFAULT_SENDER_NAME,
      },
      subject: subject,
    };

    if (!template) {
      msg.html = body;
    } else {
      msg.templateId = template;
      msg.dynamicTemplateData = templateData;
    }

    try {
      await sgMail.send(msg, false, (err: ResponseError, res: [ClientResponse, object]) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      if (error.code === 403) {
        throw new Exceptions.ForbiddenError(error.response.body.errors[0].message);
      }
      throw new Exceptions.BadRequestError(error.response.body.errors[0].message);
    }
  }

  /**
   * Sends an email to multiple recipients using sendgrid
   * @param payload
   */
  async notifyMany(payload: SendManyEmailRequest) {
    const { subject, body, recipients, sender, senderName, template, templateData } = payload;
    if (!template && !body) {
      throw new Exceptions.BadRequestError("The payload body or template parameters must be provided");
    }
    const msg: any = {
      to: [...recipients],
      from: {
        email: sender || configs.DEFAULT_SENDER_EMAIL,
        name: senderName || configs.DEFAULT_SENDER_NAME,
      },
      subject: subject,
    };

    if (!template) {
      msg.html = body;
    } else {
      msg.templateId = template;
      msg.dynamicTemplateData = templateData;
    }

    try {
      await sgMail.sendMultiple(msg, (err: ResponseError) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      if (error.code === 403) {
        throw new Exceptions.ForbiddenError(error.response.body.errors[0].message);
      }
      throw new Exceptions.BadRequestError(error.response.body.errors[0].message);
    }
  }
}
