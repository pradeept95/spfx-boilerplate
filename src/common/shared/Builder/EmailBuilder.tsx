/* eslint-disable */
import { IEmailProperties } from "@pnp/sp/sputilities"; 
import { getSP } from "@common/pnp";
import AppContext from "@common/root/app-context";

export interface IEmailProps {
  from?: string;
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

        // forward email is useful for testing purpose
        const forwardAddress = currentContext?.siteSettings?.notificationForwardEmails?.split(";"); 
        this.To = forwardAddress?.length > 0 ? forwardAddress : ["pradeep.thapaliya@nih.gov"];
        this.CC = [];
        this.BCC = [];
      }

      // add default BCC emails to monitor emails sent from the system
      const defaultBCCEmails = currentContext?.siteSettings?.notificationBccEmails?.split(";");
      if (defaultBCCEmails?.length > 0) {
        this.BCC = [...this.BCC, ...defaultBCCEmails];
      }

      //this.From = "drivenindsevents@ninds.nih.gov";
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
