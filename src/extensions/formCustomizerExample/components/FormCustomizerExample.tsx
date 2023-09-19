/*eslint-disable*/
import * as React from 'react';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import {  FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { EmailTemplateForm } from '@app/form-customizer-example/components/FormikExample/EmailTemplateForm';
// import { EmailTemplateForm } from '@app/form-customizer-example';

export interface IFormCustomizerExampleProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
} 
export default class FormCustomizerExample extends React.Component<IFormCustomizerExampleProps, {}> {  
  public render(): React.ReactElement<{}> { 
    return (
      <FluentProvider theme={teamsLightTheme}>
        <EmailTemplateForm {...this.props} />
      </FluentProvider>
    ); 
  }
}