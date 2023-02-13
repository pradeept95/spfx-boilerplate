/* eslint-disable */
import { IEmailProperties } from "@pnp/sp/sputilities";
import AppContext from "../../config/app-context.config";
import { getSP } from "../../config/pnpjs.config";

export interface IEmailProps {
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
}

interface TypedHash<T> {
  [key: string]: T;
}
const currentContext = AppContext.getInstance();
export class EmailBuilder implements IEmailProperties {
  To: string[];
  CC?: string[];
  BCC?: string[];
  Subject: string;
  Body: string;
  AdditionalHeaders?: TypedHash<string>;
  From?: string;

  private constructor() {
    this.To = [];
    this.CC = [];
    this.BCC = [];
    this.Subject = "";
    this.Body = "";
  }

  static createNewEmail = (): EmailBuilder => {
    return new EmailBuilder();
  };

  addFromEmail = (emailAddress: string): EmailBuilder => {
    this.From = emailAddress;
    return this;
  };

  addToEmails = (emailAddress: string[]): EmailBuilder => {
    this.To = [...this.To, ...emailAddress];
    return this;
  };

  addCCEmails = (emailAddress: string[]): EmailBuilder => {
    this.CC = [...this.CC, ...emailAddress];
    return this;
  };

  addBCCEmails = (emailAddress: string[]): EmailBuilder => {
    this.BCC = [...this.BCC, ...emailAddress];
    return this;
  };

  addSubject = (subject: string): EmailBuilder => {
    this.Subject = subject;
    return this;
  };

  addBody = (body: string): EmailBuilder => {
    this.Body = body;
    return this;
  };

  appendBody = (body: string): EmailBuilder => {
    this.Body = this.Body + body;
    return this;
  };

  addHeaders = (additionalHeaders: TypedHash<string>): EmailBuilder => {
    this.AdditionalHeaders = additionalHeaders;
    return this;
  };

  send = async () => {
    try {
      if (!this) throw "Email Configuration is not created.";
      if (!this.To) throw "Email Receiver is not added.";

      if (!currentContext?.siteSettings?.isNotificationEnabled) {
        this.appendBody(
          "<br/> <h1> Following are the actual email receiver. </h1> <hr/>"
        );
        this.appendBody("TO Emails : " + this.To?.join(", ") + "<br/>");
        this.appendBody("CC Emails: " + this.CC?.join(",") + "<br/>");
        this.appendBody("BCC Emails: " + this.BCC?.join(",") + "<br/>");

        const deligatedEmails =
          currentContext?.siteSettings?.notificationDeligateEmail?.split(";");
        this.To = deligatedEmails;
        this.CC = [];
        this.BCC = [];
      }

      this.From = "drivenindsevents@ninds.nih.gov";
      // get sp configuration
      const sp = await getSP();
      // send email
      await sp.utility
        .sendEmail(this as IEmailProperties)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
        
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
