/* eslint-disable */
import * as React from "react"; 
import { RichTextEditor } from "../../common/components/RichTextEditor";

const EditorExample: React.FunctionComponent<{}> = (props) => { 

    const [value, setValue] = React.useState("")

    return (
        <>
            <section>
                <h3>Rich Text Editor Example</h3> <hr />
                <RichTextEditor value={value} onChange={(v)=> { 
                    setValue(v);
                }}/>

                <br/>
                <p dangerouslySetInnerHTML={{__html : value}}></p>
            </section>
        </>
    );
};

export default EditorExample;
