/* eslint-disable */
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles/rich-viewer.style.css";

const no_modules = {
    toolbar: false,
};

export const RichTextViewer: React.FunctionComponent<{ value: string }> = (
    props
) => {
    const { value } = props; 
    return ( 
        <div style={{ display: "block", paddingTop: 10 }}>
            {
                <ReactQuill
                    theme="snow"
                    value={value}
                    readOnly={true}
                    modules={no_modules} 
                    style={{
                        width: "100%",
                        minHeight: "150px",
                    }}
                />
            }
        </div>
    );
};