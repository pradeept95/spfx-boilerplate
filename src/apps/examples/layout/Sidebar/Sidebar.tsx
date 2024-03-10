/* eslint-disable */
import * as React from 'react';
import { NavLinkGroup, SideNav } from '@common/layout/components/SideNav';

const navigation: NavLinkGroup[] = [
   {
      title: 'Basic Examples',
      isExpanded: true,
      links: [
         {
            key: 'home',
            name: 'Home',
            url: '/examples',
            icon: null,
         },
         {
            key: 'form',
            name: 'Form',
            url: '/examples/form',
            icon: null,
         },
         // people picker
         {
            key: 'people-picker',
            name: 'People Picker',
            url: '/examples/people',
            icon: null,
         },
         // file upload
         {
            key: 'file-upload',
            name: 'File Upload',
            url: '/examples/file',
            icon: null,
         },
         // send email
         {
            key: 'send-email',
            name: 'Send Email',
            url: '/examples/email',
            icon: null,
         },
         {
            key: 'editor',
            name: 'Editor',
            url: '/examples/editor',
            icon: null,
         },
         {
            key: 'e-signature',
            name: 'E-Signature',
            url: '/examples/esignature',
            icon: null,
         },
         //pdf
         {
            key: 'pdf',
            name: 'PDF',
            url: '/examples/pdf',
            icon: null,
         },
         // chart
         {
            key: 'chart',
            name: 'Chart',
            url: '/examples/chart',
            icon: null,
         },
         // docusign
         {
            key: 'docusign',
            name: 'DocuSign',
            url: '/examples/docusign',
            icon: null,
         },
         // notify

         // real time
         {
            key: 'real-time',
            name: 'Real Time',
            url: '/examples/real-time',
            icon: null,
         },
         // loading
      ],
   },
   {
      title: 'Table Examples',
      isExpanded: true,
      links: [
         {
            key: 'table2',
            name: 'Basic Table',
            url: '/examples/table2',
            icon: null,
         },
         {
            key: 'table',
            name: 'Advanced Table',
            url: '/examples/table',
            icon: null,
         },
      ],
   },
   {
      title: 'Common Features Example',
      isExpanded: true,
      links: [
         {
            key: 'loading',
            name: 'Loading',
            url: '/examples/loading',
            icon: null,
         },
         {
            key: 'notify',
            name: 'Notify',
            url: '/examples/notify',
            icon: null,
         },
         {
            key: 'confirm',
            name: 'Confirm',
            url: '/examples/confirm',
            icon: null,
         },
         {
            key: 'all-features',
            name: 'All Features',
            url: '/examples/all-features',
            icon: null,
         },
         {
            key: 'controls',
            name: 'Flow Controls',
            url: '/examples/controls',
            icon: null,
         },
      ],
   },
];

export const SideBar: React.FunctionComponent<{}> = () => {
   return (
      <div>
         <SideNav navLinkGroups={navigation} />
      </div>
   );
};
