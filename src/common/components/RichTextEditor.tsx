/* eslint-disable */
import * as React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FieldControlProps, makeStyles, shorthands, tokens } from "@fluentui/react-components";

const modules = {
  toolbar: [
    // [{ font: [] }],
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    // [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    ["link"],
    ["blockquote", "code-block"],
    ["clean"], // remove formatting button
  ] as const,
  // toolbar: { container: "#toolbar" },
  keyboard: { bindings: { tab: false } },
};

export const RichTextEditor: React.FunctionComponent<
  ReactQuillProps & Partial<FieldControlProps>
> = React.forwardRef((props, ref) => {
  React.useEffect(() => {
    // get all the buttons inside the toolbar
    const formats = document.querySelectorAll(".ql-formats");

    // get buttons from each format group
    (formats || []).forEach((format) => {
      const buttons = format.querySelectorAll("button");

      // add a tab index to each button
      (buttons || []).forEach((button) => {
        (button as HTMLButtonElement).tabIndex = -1;
      });
    });
  }, []);

  const classes = useRichTextEditorStyles();

  return (
    <ReactQuill
      {...props}
      ref={ref as any}
      theme="snow"
      modules={modules}
      className={props?.["aria-invalid"] ? classes.error : classes.regular}
      aria-labelledby={props?.["aria-labelledby"]}
      aria-invalid={props?.["aria-invalid"]}
    />
  );
});

export const useRichTextEditorStyles = makeStyles({
  error: {
    ...shorthands.border(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorPaletteRedBorder2
    ),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    "& .ql-toolbar": {
      ...shorthands.border("none"),
      ...shorthands.padding(tokens.spacingVerticalXXS),
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },

    "& .ql-container": {
      ...shorthands.border("none"),
      minHeight: "9rem",

      "& .ql-editor": {
        ...shorthands.padding(
          tokens.spacingVerticalMNudge,
          tokens.spacingHorizontalSNudge
        ),
        boxShadow: tokens.shadow2,
        minHeight: "9rem",
        height: "auto",

        "::before": {
          ...shorthands.padding(tokens.spacingVerticalXXS),

          fontStyle: "normal",
          opacity: 1,
          color: tokens.colorNeutralForeground4,
          lineHeight: tokens.lineHeightBase200,
          fontWeight: tokens.fontWeightRegular,
          fontFamily: "inherit",
          fontSize: tokens.fontSizeBase200,

          left: tokens.spacingHorizontalXS,
          right: tokens.spacingHorizontalXS,
        },
      },
    },

    // reset the border when focus
    ":has(.ql-toolbar):focus-within": {
      ...shorthands.borderTop(
        tokens.strokeWidthThin,
        "solid",
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderRight(
        tokens.strokeWidthThin,
        "solid",
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderLeft(
        tokens.strokeWidthThin,
        "solid",
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderBottom(
        tokens.strokeWidthThick,
        "solid",
        tokens.colorBrandStroke1
      ),
    },
  },
  regular: {
    ...shorthands.borderTop(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderRight(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderLeft(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderBottom(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorNeutralStrokeAccessible
    ),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    "& .ql-toolbar": {
      ...shorthands.border("none"),
      ...shorthands.padding(tokens.spacingVerticalXXS),
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },

    "& .ql-container": {
      ...shorthands.border("none"),
      minHeight: "9rem",

      "& .ql-editor": {
        ...shorthands.padding(
          tokens.spacingVerticalMNudge,
          tokens.spacingHorizontalSNudge
        ),
        boxShadow: tokens.shadow2,
        minHeight: "9rem",
        height: "auto",

        "::before": {
          ...shorthands.padding(tokens.spacingVerticalXXS),

          fontStyle: "normal",
          opacity: 1,
          color: tokens.colorNeutralForeground4,
          lineHeight: tokens.lineHeightBase200,
          fontWeight: tokens.fontWeightRegular,
          fontFamily: "inherit",
          fontSize: tokens.fontSizeBase200,

          left: tokens.spacingHorizontalXS,
          right: tokens.spacingHorizontalXS,
        },
      },
    },

    // border on focus
    ":has(.ql-toolbar):focus-within": {
      ...shorthands.borderBottom(
        tokens.strokeWidthThick,
        "solid",
        tokens.colorBrandStroke1
      ),
    },
  },
});
