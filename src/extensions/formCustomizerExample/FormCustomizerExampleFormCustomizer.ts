/* eslint-disable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import FormCustomizerExample, { IFormCustomizerExampleProps } from './components/FormCustomizerExample';
import AppContext from '@common/root/app-context';

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFormCustomizerExampleFormCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'FormCustomizerExampleFormCustomizer';

 const appContext = AppContext.getInstance();
export default class FormCustomizerExampleFormCustomizer extends BaseFormCustomizer<IFormCustomizerExampleFormCustomizerProperties> {

  public async onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(LOG_SOURCE, 'Activated FormCustomizerExampleFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    await appContext.initialize(this.context); 

    //  await appContext.addSetting(props.settings);
     await appContext.setIsDarkTheme(false);
    //  await appContext.setLayoutStyle(false);
    //  await appContext.setSiteName(
    //    props.settings?.siteName ? props.settings?.siteName : "SPFx Test App"
    //  );

     return Promise.resolve();
    
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    const formCustomizerExample: React.ReactElement<{}> =
      React.createElement(FormCustomizerExample, {
        context: this.context,
        displayMode: this.displayMode,
        onSave: this._onSave,
        onClose: this._onClose
       } as IFormCustomizerExampleProps);

    ReactDOM.render(formCustomizerExample, this.domElement);
  } 

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _onSave = (): void => {

    // You MUST call this.formSaved() after you save the form.
    this.formSaved();
  }

  private _onClose =  (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}
