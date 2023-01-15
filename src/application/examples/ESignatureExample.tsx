/* eslint-disable */
import * as React from "react";  
import ESignature from "../../common/components/ESignature";

const ESignatureExample: React.FunctionComponent<{}> = (props) => { 

    const [signature, setSignature] = React.useState("")

    const handleUseSignature = (signature : string) => {
        setSignature(signature);
    }

    return (
        <>
            <section>
                <h3>E-Signature Example</h3> <hr />
                <ESignature onUseSignature={handleUseSignature}/> 
                <br/> 
                {signature && <img src={signature} alt="Signature Here" />}
            </section>
        </>
    );
};

export default ESignatureExample;
