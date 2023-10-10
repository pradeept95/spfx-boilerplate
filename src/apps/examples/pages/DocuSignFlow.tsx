/* eslint-disable */ 
import * as React from "react"; 
import { PeoplePicker } from "../../../common/components/PeoplePicker"; 
import { DocuSignService } from "../../../common/services/DocuSignService";
import { Button, Input } from "@fluentui/react-components";
import { useAlert } from "@prt-ts/fluent-common-features";
const { authorizeApp, createEnvelope } = DocuSignService();

export const useDocuSign = () => {
  const submitForSign = async (envelope: any): Promise<void> => {
     

    const response = await authorizeApp();
 

    const envDetails = await createEnvelope(response?.access_token, envelope);
    console.log(envDetails);
    if (envDetails?.envelopeId) {
      
    } else {
      
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
      error({
        title: "No Signer Selected",
        body: "Please select at least one signer to send for signature",
      });
      return;
    }

    if (!files.length) {
      error({
        title: "No files selected",
        body: "Please select at least one file to send for signature",
      });
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
        <Input placeholder="OR Enter E-Mail" onChange={(e, newValue) => {
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
        <Button 
          onClick={() => sendForSignature()}
        >Send for Signature </Button>
      </section>
    </>
  );
};

export default DocuSignExample;
