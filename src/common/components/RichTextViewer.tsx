/* eslint-disable */
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles/rich-viewer.style.css";

const no_modules = {
    toolbar: false,
};

export const RichTextViewer: React.FC<{children : string}> = (
    { children}
) => { 
    const classes = useRichTextEditorStyles()
    return (
      <div style={{ display: "block", paddingTop: 10 }}>
        {
          <ReactQuill
            theme="snow"
            value={children}
            readOnly={true}
            modules={no_modules}
            className={classes.regular} 
          />
        }
      </div>
    );
};

import { makeStyles, shorthands } from "@fluentui/react-components";

export const useRichTextEditorStyles = makeStyles({
  regular: {
    "& .ql-container": {
      ...shorthands.border("none"),
      height: "auto",
      minHeight: "1rem",

      "& .ql-editor": {
        ...shorthands.border("none"),
        height: "auto",
        minHeight: "1rem",
        ...shorthands.padding(0),
      },
    },
  },
});
