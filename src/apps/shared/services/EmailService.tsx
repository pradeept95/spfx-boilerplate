/* eslint-disable */
import { handleError } from "@common/pnp";
import {
  EmailBuilder,
  IEmailProps,
} from "../../../common/shared/Builder/EmailBuilder";

export const useEmailService = () => {
  (async () => {})();

  const sendTestEmail = async (emailPros: IEmailProps) => {
    try {
      const email = EmailBuilder.createNewEmail();

      console.log("sendTestEmail -> emailPros", emailPros);

      email
        .addFromEmail(emailPros?.from)
        .addToEmails([...emailPros.to])
        .addCCEmails([...emailPros.cc])
        .addBCCEmails([...emailPros.bcc])
        .addSubject(emailPros?.subject)
        .addBody(emailPros?.body);

      await email.send();
    } catch (error) {
      console.error("sendTestEmail -> error", error);
      handleError(error);
    }
  };

  return {
    sendTestEmail,
  };
};
