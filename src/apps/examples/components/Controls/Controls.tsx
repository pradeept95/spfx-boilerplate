import * as React from 'react';
import { Case, For, Show, Switch } from '@prt-ts/react-control-flow';
// create for example

type User = {
   name: string;
   age: number;
   role: string;
};

const users: User[] = [
   {
      name: 'John',
      age: 42,
      role: 'admin',
   },
   {
      name: 'Jane',
      age: 21,
      role: 'user',
   },
   {
      name: 'Joe',
      age: 32,
      role: 'user',
   },
];

export const ForExample: React.FC = () => {
   return (
      <>
         <h2>For</h2>
         <For each={users}>
            {(user, index) => (
               <div key={index}>
                  {index + 1} - {user.name} - {user.age} - {user.role}
               </div>
            )}
         </For>

         <h2>For with empty state</h2>
         <For each={[]} emptyState={<div>No users</div>}>
            {(user, index) => (
               <div>
                  {index + 1} - {user.name} - {user.age} - {user.role}
               </div>
            )}
         </For>
      </>
   );
};

// create show example
export const ShowExample: React.FC = () => {
   const condition = 15 > 10;
   return (
      <>
         <h2>Show</h2>
         <Show when={condition}>
            <div>This is visible because condition is true</div>
         </Show>
         <Show when={!condition} fallback={<> This is visible because condition is false </>}>
            <div>This will not be visible</div>
         </Show>
      </>
   );
};

// create switch example
export const SwitchExample: React.FC = () => {
   const [status, setStatus] = React.useState<'success' | 'error' | 'ideal' | 'staled' | 'sth-else'>('success');
   return (
      <div>
         <h2>Switch</h2>
         <div
            style={{
               display: 'flex',
               gap: '1rem',
               marginBottom: '1rem',
            }}
         >
            <div>status: {status}</div>
            <button onClick={() => setStatus('success')}>Success</button>
            <button onClick={() => setStatus('error')}>Error</button>
            <button onClick={() => setStatus('ideal')}>Ideal</button>
            <button onClick={() => setStatus('staled')}>Staled</button>
            <button onClick={() => setStatus('sth-else')}>Something Else (not matching any case)</button>
         </div>
         <div style={{ display: 'block' }}>
            <Switch when={status} fallback={<>This is the default option</>}>
               <Case value={'success'}>
                  <div>Success Case</div>
               </Case>
               <Case value={['error', 'ideal']}>
                  <div>Error Case or Idle</div>
               </Case>
               <Case value={'staled'}>
                  <div>Staled Case</div>
               </Case>
            </Switch>
         </div>
      </div>
   );
};
