/* eslint-disable */
import * as React from "react"; 
// import { SampleSaleService } from "../../shared/services/SampleSaleService"; 

// const { getAllSalesData } = SampleSaleService();
 

// const dataTableContextMenu: ICommandBarItemProps[] = [
//   {
//     key: "newItem",
//     text: "New",
//     iconProps: { iconName: "Add" },
//     onClick: () => console.log("New"),
//   },
//   {
//     key: "upload",
//     text: "Upload",
//     iconProps: { iconName: "Upload" },
//     onClick: () => console.log("Upload"),
//   },
//   {
//     key: "share",
//     text: "Share",
//     iconProps: { iconName: "Share" },
//     onClick: () => console.log("Share"),
//   },
//   {
//     key: "download",
//     text: "Download",
//     iconProps: { iconName: "Download" },
//     onClick: () => console.log("Download"),
//   },
// ];

// export const DataTableExamplePage1: React.FunctionComponent<{}> = (props) => {
//   const [items, setItems] = React.useState<SampleSales[]>([]);
//   // const [selectedItems, setSelectedItems] = React.useState<SampleSales[]>([]);
//   const [loading, setLoading] = React.useState<boolean>(false);

//   const columns: IDataGridColumn[] = [
//     {
//       key: "id",
//       name: "id",
//       iconName: "Page",
//       fieldName: "id",
//       isIconOnly: true,
//       minWidth: 30,
//       maxWidth: 30,
//     },
//     {
//       key: "region",
//       name: "Region",
//       fieldName: "region",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       filterType: "multiselect",
//       disableGrouping: true,
//     },
//     {
//       key: "created",
//       name: "Created Date",
//       fieldName: "created",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       onRender: (item: any) => {
//         return (
//           <span>{new Date(item.created)?.toLocaleDateString("en-US")}</span>
//         );
//       },
//       filterType: "date",
//     },
//     {
//       key: "updated",
//       name: "Updated Date",
//       fieldName: "updated",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       onRender: (item: any) => {
//         return (
//           <span>{new Date(item.updated)?.toLocaleDateString("en-US")}</span>
//         );
//       },
//       filterType: "date",
//     },
//     {
//       key: "city",
//       name: "City",
//       fieldName: "city",
//       maxWidth: 150,
//       isResizable: true,
//       minWidth: 130,
//       data: "string",
//       disableFilter: true,
//       isGrouped: true,
//     },
//     {
//       key: "category",
//       name: "Category",
//       fieldName: "category",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//       disableSorting: true,
//       filterExpression: {
//         condition: "or",
//         expressions: [
//           {
//             key: "category",
//             operation: "starts_with",
//             value: "Bars",
//           },
//           {
//             key: "category",
//             operation: "starts_with",
//             value: "Cookies",
//           },
//         ],
//       },
//     },
//     {
//       key: "product",
//       name: "Product",
//       fieldName: "product",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//     },
//     {
//       key: "quantity",
//       name: "Quantity",
//       fieldName: "quantity",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       data: "number",
//     },
//     {
//       key: "unitPrice",
//       name: "Unit Price",
//       fieldName: "unitPrice",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       data: "number",
//     },
//     {
//       key: "totalPrice",
//       name: "Total Price",
//       fieldName: "totalPrice",
//       minWidth: 130,
//       maxWidth: 150,
//       isResizable: true,
//       data: "number",
//       filterType: "multiselect",
//     },
//   ];

//   // console.log(selectedItems);

//   const callApi = async () => {
//     try {
//       setLoading(true);
//       const items = await getAllSalesData();
//       setItems(items);
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     callApi();
//   }, []);

//   return (
//     <>
//       <section>
//         <DataTableGrid
//           gridKeyField="id"
//           loading={loading}
//           items={items}
//           columns={columns}
//           pageSize={100}
//           onSelectionChanged={(selectedItems) => {
//             console.log(selectedItems);
//           }}
//         />
//       </section>
//     </>
//   );
// };

export const DataTableExamplePage1: React.FunctionComponent<{}> = (props) => {
  // const [items, setItems] = React.useState<SampleSales[]>([]);
  // const [loading, setLoading] = React.useState<boolean>(false);

  // const callApi = async () => {
  //   try {
  //     setLoading(true);
  //     const items = await getAllSalesData();
  //     setItems(items);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   callApi();
  // }, []);

  // const handleGetContextMenuItem = (selecteItems: any[]): ICommandBarItemProps[] => {
  //   let commands: ICommandBarItemProps[] = [
  //     {
  //       key: "newItem",
  //       text: "New Task",
  //       iconProps: { iconName: "Add" },
  //       onClick: () => console.log("/myninds/0/new"),
  //     },
  //   ];

  //   if (selecteItems?.length == 1) {
  //     commands.push({
  //       key: "edit",
  //       text: "Edit Task",
  //       iconProps: { iconName: "Edit" },
  //       disabled: selecteItems?.length !== 1,
  //       onClick: () => console.log(`/myninds/${selecteItems?.[0]?.id}/new`),
  //     });
  //   }

  //   if (selecteItems?.length == 1) {
  //     commands.push({
  //       key: "complete",
  //       text: "Mark Completed",
  //       iconProps: { iconName: "SkypeCircleCheck" },
  //       onClick: () => {
  //         console.log("completed");
  //         // handleCompleteTask(selecteItems?.[0]);
  //       },
  //     });
  //   }

  //   return commands;
  // };

  // const handleItemSelect = (selectedItems: SampleSales[]) => {
  //   console.log("From Component", selectedItems);
  // };

  // const handleCardViewRender = (item: SampleSales, isSelected: boolean, onItemSelect: (selectedItems: any[], isSelected: boolean) => void): JSX.Element => {
  //   return (<ItemCardView item={item} isSelected={isSelected} onItemSelect={onItemSelect} />)
  // }

  return (
    <>
      {/* <FluentUIDataGrid
        gridColKey="id"
        gridTitle="Test Grid Title"
        gridDescription="Some long description for the grid"
        columns={columns}
        isLoading={loading}
        items={items}
        pageSize={20}
        expandDefaultGroups={true}
        onSelectionChange={handleItemSelect}
        onGetActionMenuItem={handleGetContextMenuItem}
        onCardViewRender={handleCardViewRender}
      /> */}
    </>
  );
};

export const DataTableExamplePage2: React.FunctionComponent<{}> = (props) => {
  // const [items, setItems] = React.useState<SampleSales[]>([]);
  // const [loading, setLoading] = React.useState<boolean>(false);

  // const callApi = async () => {
  //   try {
  //     setLoading(true);
  //     const items = await getAllSalesData();
  //     setItems(items);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   callApi();
  // }, []);

  // const handleGetContextMenuItem = (selecteItems: any[]): ICommandBarItemProps[] => {
  //   let commands: ICommandBarItemProps[] = [
  //     {
  //       key: "newItem",
  //       text: "New Task",
  //       iconProps: { iconName: "Add" },
  //       onClick: () => console.log("/myninds/0/new"),
  //     },
  //   ];

  //   if (selecteItems?.length == 1) {
  //     commands.push({
  //       key: "edit",
  //       text: "Edit Task",
  //       iconProps: { iconName: "Edit" },
  //       disabled: selecteItems?.length !== 1,
  //       onClick: () => console.log(`/myninds/${selecteItems?.[0]?.id}/new`),
  //     });
  //   }

  //   if (selecteItems?.length == 1) {
  //     commands.push({
  //       key: "complete",
  //       text: "Mark Completed",
  //       iconProps: { iconName: "SkypeCircleCheck" },
  //       onClick: () => {
  //         console.log("completed");
  //         // handleCompleteTask(selecteItems?.[0]);
  //       },
  //     });
  //   }

  //   return commands;
  // };

  // const handleItemSelect = (selectedItems: SampleSales[]) => {
  //   console.log("From Component", selectedItems);
  // };

  return (
    <>
      {/* <FluentUIDataGrid
        gridColKey="id"
        gridTitle="Test Grid Title"
        gridDescription="Some long description for the grid"
        columns={columns2}
        isLoading={loading}
        items={items}
        pageSize={20}
        expandDefaultGroups={true}
        onSelectionChange={handleItemSelect}
        onGetActionMenuItem={handleGetContextMenuItem}
      /> */}
      {/* <section>
        <FluentUIDataGrid
          key="id"
          gridTitle="No Data Example"
          gridDescription="Grid does not have any data and have custom empty items grid message"
          columns={columns2}
          isLoading={loading}
          items={[]}
          pageSize={20}
          expandDefaultGroups={true}
          onSelectionChange={handleItemSelect}
          onGetActionMenuItem={handleGetContextMenuItem}
          emptyGridMessage={"No Item to Show (custom message)"}

        />
      </section>
      <section>
        <FluentUIDataGrid
          key="id"
          disableTitleSection={true}
          columns={columns2}
          isLoading={loading}
          items={[]}
          pageSize={20}
          expandDefaultGroups={true}
          onSelectionChange={handleItemSelect}
          onGetActionMenuItem={handleGetContextMenuItem}
          emptyGridMessage={"No Item to Show (custom message)"}
          disableGridMode={true}
        />
      </section> */} 
    </>
  );
};
