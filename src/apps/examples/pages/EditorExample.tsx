/* eslint-disable */
import * as React from "react"; 
import { RichTextEditor } from "../../../common/components/RichTextEditor";
import { RichTextViewer } from "../../../common/components/RichTextViewer";

const EditorExample: React.FunctionComponent<{}> = (props) => { 

    const [value, setValue] = React.useState("")

    return (
      <>
        <section>
          <h3>Rich Text Editor Example</h3> <hr />
          <RichTextEditor
            value={value}
            onChange={(v) => {
              setValue(v);
            }}
          />
          <br />
          <RichTextViewer>{value}</RichTextViewer>
        </section>
      </>
    );
};

export default EditorExample;
