/* eslint-disable */
import {
  EmailBuilder,
  IEmailProps,
} from "../../../common/shared/Builder/EmailBuilder";

export const useEmailService = () => {
  (async () => {})();

  const sendTestEmail = async (emailPros: IEmailProps) => {
    try {
      const email = EmailBuilder.createNewEmail();

      email
        .addFromEmail("nindsirmbscruma-team@mail.nih.gov")
        .addToEmails([...emailPros.to])
        .addCCEmails([...emailPros.cc])
        .addSubject(emailPros?.subject)
        .addBody(emailPros?.body);

      await email.send();
    } catch (error) {
      console.error("sendTestEmail -> error", error);
      throw error;
    }
  };

  return {
    sendTestEmail,
  };
};
