/* eslint-disable */
import * as React from "react";

import {
  //import default style
  formStyles,

  //import layout helpers
  Section,
  Row,

  //import element helpers
  TextInput,
  TextInputNoLabel,
  SectionHeader,
  CurrencyInput,
  DateInput,
  SelectInput,
  TextareaInput,
  RichTextareaInput,
  CheckboxInput,
  RadioInput,
} from "@prt-ts/pdf-json-helpers";
import { exportToFile } from "@prt-ts/export-helpers";
import { useTrackPageView } from "@common/hooks/useTrackPageView";

const testHTML = `<h3>Value in H3 Html Tag</h3><p>first paragraph with <i>Italics</i> <b>Bold<b> and more</p><p>second paragraph</p><p>third paragraph</p>`;

const pdfStyle = {
  // use the default form element style
  ...formStyles,

  // add your own style or override the existing one here
};

var exampleDocumentDefination: any = {
  content: [
    {
      text: "pdfMake : HTML FORM EXAMPLE",
      style: "header",
    },
    Section([
      SectionHeader("Mix Column Layout, multiple rows"),
      Row([
        TextInput("Input type text", "This is the value of the text input"),
        CurrencyInput("Currency type example", "1,000,000"),
        CurrencyInput("Currency", "1,000,000.00"),
      ]),
      Row([
        TextInput("Input type text", "This is the value of the text input"),
        CurrencyInput("Currency type example", "1,000,000"),
      ]),
    ]),

    // new section
    Section([
      SectionHeader("Three Column Layout"),
      Row([
        DateInput("Input type date example", new Date()),
        SelectInput(
          "Select input type style",
          "This is the value of the input"
        ),
        TextInputNoLabel("This is example of input with no Label"),
      ]),
    ]),

    //more section
    Section([
      SectionHeader("Single Column Layout/ Textarea Example"),
      Row([
        TextareaInput(
          "Some Label (Textarea Example)",
          "This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
        ),
      ]),
    ]),

    //more section
    Section([
      SectionHeader("Rich Text Editor Example (Support HTML Tags)"),
      Row([RichTextareaInput("Rich Text Editor Label", testHTML)]),
    ]),

    //Checkbox and Radio buttons section
    Section([
      SectionHeader("Checkbox and Radio Styles"),
      Row([CheckboxInput("Checkbox labe with checked checbox", false)]),
      Row([CheckboxInput("Unchecked Checkbox with plain text label", false)]),
      Row([
        CheckboxInput(
          "Checkbox with html content <br/>" + testHTML,
          false,
          "html"
        ),
      ]),
      Row([
        CheckboxInput(
          "Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)"
        , false),
      ]),
      Row([
        RadioInput("Radio Example, Horizontal Layout (Default)", [
          {
            itemLabel: "Option 1",
            selected: false,
            width: "auto",
          },
          {
            itemLabel: "Option 2",
            selected: true,
            width: "auto",
          },
          {
            itemLabel: "Option 3",
            selected: false,
            width: "auto",
          },
        ]),
      ]),
      Row([
        RadioInput(
          "Radio Example, Vertical Layout",
          [
            {
              itemLabel: "Option 1",
              selected: true,
              width: "auto",
            },
            {
              itemLabel: "Option 2",
              selected: false,
              width: "auto",
            },
            {
              itemLabel:
                "Option 3,  Very long text, Checkbox with very long text. This is the value of the input First Label (Input Example) First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)First Label (Input Example)",
              selected: false,
              width: "auto",
            },
          ],
          "vertical"
        ),
      ]),
    ]),
  ],
  styles: pdfStyle,
};

const PDFMakeExample: React.FunctionComponent<{}> = (props) => {

  useTrackPageView({
    name: "PDF Make Example",
  });

  const inputElement = TextInput("Hello", "test");
  console.log(inputElement);

  const handlePdfMake = () => {
    let docDef: any = { ...exampleDocumentDefination };
    exportToFile(docDef, "Test Spfx download");
  };

  return (
    <div className="App">
      <button onClick={handlePdfMake}>Download</button>
    </div>
  );
};

export default PDFMakeExample;
