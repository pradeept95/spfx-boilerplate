import { Divider } from '@fluentui/react-components';
import * as React from 'react';
import { ForExample, ShowExample, SwitchExample } from '../components/Controls/Controls';

const ControlFlow: React.FC = () => {
   return (
      <div>
         <h1>Controls</h1>
         <ForExample />
         <Divider />
         <ShowExample />
         <Divider />
         <SwitchExample />
      </div>
   );
};

export default ControlFlow;
