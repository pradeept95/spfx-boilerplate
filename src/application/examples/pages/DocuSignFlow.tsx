/* eslint-disable */
import { PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import { toast } from "react-toastify";
import { PeoplePicker } from "../../../common/components/PeoplePicker";
import { useAlert } from "../../../common/hooks/useAlert";
import { DocuSignService } from "../../../common/services/DocuSignService";
const { authorizeApp, createEnvelope } = DocuSignService();

export const useDocuSign = () => {
  const submitForSign = async (envelope: any): Promise<void> => {
    const id = toast.loading("Please wait. Authorizing...", {
      theme: "dark",
    });

    const response = await authorizeApp();

    toast.update(id, {
      render: "Please wait. Sending Envelope...",
      isLoading: true,
      theme: "dark",
    });

    const envDetails = await createEnvelope(response?.access_token, envelope);
    console.log(envDetails);
    if (envDetails?.envelopeId) {
      toast.update(id, {
        render: "Documents are sent for signature.",
        type: "success",
        isLoading: false,
        theme: "dark",
        closeOnClick: true,
        autoClose: 5000,
      });
    } else {
      toast.update(id, {
        render: "Something went wrong. Please try again",
        type: "error",
        isLoading: false,
        theme: "dark",
        closeOnClick: true,
        autoClose: 5000,
      });
    }
  };

  return [submitForSign] as const;
};

const DocuSignExample: React.FunctionComponent<{}> = (props) => {
  const [submitForSign] = useDocuSign();
  const { error } = useAlert();
  console.log(submitForSign);

  const [signer, setSigner] = React.useState<any[]>([]);
  const [files, setFiles] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log(signer, files);
  }, [signer, files]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    let documents: any[] = [];
    for (var i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      console.log(fileName);
      documents.push({
        documentBase64: await getBase64(files[i]), //?.replace( "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", ""),
        documentId: 123456789,
        fileExtension: fileName?.split(".")?.[1],
        name: fileName,
      });
    }
    setFiles(documents);
  };

  const getBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        const base64StringOnly = (reader.result as string)
          ?.replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64StringOnly);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        reject(error);
      };
    });
  };

  const sendForSignature = async () => {
    if (!signer.length) {
      error("At least one signer is required");
      return;
    }

    if (!files.length) {
      error("At least one file is required");
      return;
    }

    const envelope = {
      documents: [...files],
      emailSubject: "Sending document for signature using SPFx Solution",
      recipients: {
        signers: [...signer],
      },
      status: "sent",
    };

    await submitForSign(envelope);
  };

  return (
    <>
      <section>
        <h3>DocuSign Example</h3> <hr />
        <PeoplePicker
          label="Select Signer"
          peoplePickerType="Normal"
          personSelectionLimit={20}
          required={true}
          onPeopleSelectChange={async (users) => {
            const newSigners = users?.map((user) => ({
              email: user.secondaryText,
              name: user.text,
              recipientId: user.id,
            }));
            setSigner(newSigners);
          }}
        ></PeoplePicker>
        <TextField label="OR Enter E-Mail" onChange={(e, newValue) => {
           const newSigner = {
             ...signer?.[0],
             email: newValue, 
           };
           setSigner([newSigner])
        }} />
        <input
          type="file"
          name="upload"
          accept=".pdf, .doc, .docx"
          multiple={true}
          onChange={(event) => {
            handleFileChange(event);
          }}
          onClick={(event) => {
            (event.target as any).value = null;
            setFiles([]);
          }}
        />
        <PrimaryButton
          text="Send for Signature"
          onClick={() => sendForSignature()}
        />
      </section>
    </>
  );
};

export default DocuSignExample;
