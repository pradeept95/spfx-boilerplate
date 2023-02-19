/* eslint-disable */
import { ICommandBarItemProps } from "@fluentui/react";
import * as React from "react"; 
import { FluentUIDataGrid } from "../../../common/components/FluentUIDataGrid";
import { IDataGridColumn } from "../../../common/components/FluentUIDataGrid/src/types/DataGridProps";
import { SampleSales } from "../../shared/models/sample-sales.model";
import { SampleSaleService } from "../../shared/services/SampleSaleService";

const { getAllSalesData } = SampleSaleService();

const columns: IDataGridColumn<SampleSales>[] = [
  {
    key: "id",
    name: "ID",
    fieldName: "id",
    isSorted: true,
    isSortedDescending: true,
    onRender: (item: any) => {
      return <>{item?.id}</>;
    },
    disableHideShow : true
  },
  {
    key: "region",
    name: "Region",
    fieldName: "region" 
  },
  {
    key: "city",
    name: "City",
    fieldName: "city",
     
  },
  {
    key: "category",
    name: "Category",
    fieldName: "category" 
  },
  {
    key: "product",
    name: "Product",
    fieldName: "product" 
  },
  {
    key: "quantity",
    name: "Quantity",
    fieldName: "quantity" 
  },
  {
    key: "unitPrice",
    name: "Unit Price",
    fieldName: "unitPrice"  
  },
  {
    key: "totalPrice",
    name: "Total Price",
    fieldName: "totalPrice" 
  },
];

const columns2: IDataGridColumn<SampleSales>[] = [
  {
    key: "id",
    name: "ID",
    fieldName: "id",
    isSorted: true,
    isSortedDescending: true,
    onRender: (item: any) => {
      return <>{item?.id}</>;
    },
    disableHideShow : true
  },
  {
    key: "region",
    name: "Region",
    fieldName: "region",
    isGrouped: true,
    groupOrderNumber: 1,
    disableHideShow : true
  },
  {
    key: "city",
    name: "City",
    fieldName: "city",
    filterExpression: {
      condition: "or",
      expressions: [
        {
          key: "city",
          operation: "contains",
          value: "Los",
        },
        {
          key: "city",
          operation: "contains",
          value: "New",
        },
      ],
    },
    // isGrouped: true,
    // groupOrderNumber: 2,
  },
  {
    key: "category",
    name: "Category",
    fieldName: "category",
    isGrouped: true,
    groupOrderNumber: 3,
  },
  {
    key: "product",
    name: "Product",
    fieldName: "product",
    // isGrouped: true,
    // groupOrderNumber: 3,
  },
  {
    key: "quantity",
    name: "Quantity",
    fieldName: "quantity",
    onRender: (item: SampleSales) => {
      const quantity = item.quantity;
      if (quantity > 30) {
        return <>{quantity}</>;
      } else {
        return (
          <>
            <span style={{ color: "red" }}>{quantity}</span>
          </>
        );
      }
    },
  },
  {
    key: "unitPrice",
    name: "Unit Price",
    fieldName: "unitPrice",
    hideInDefaultView : true,    
  },
  {
    key: "totalPrice",
    name: "Total Price",
    fieldName: "totalPrice",
    hideInDefaultView : true
  },
];

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
  const [items, setItems] = React.useState<SampleSales[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const callApi = async () => {
    try {
      setLoading(true);
      const items = await getAllSalesData();
      setItems(items);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    callApi();
  }, []);

  const handleGetContextMenuItem = (selecteItems: any[]): ICommandBarItemProps[] => {
      let commands: ICommandBarItemProps[] = [
        {
          key: "newItem",
          text: "New Task",
          iconProps: { iconName: "Add" },
          onClick: () => console.log("/myninds/0/new"),
        },
      ];

      if (selecteItems?.length == 1) {
        commands.push({
          key: "edit",
          text: "Edit Task",
          iconProps: { iconName: "Edit" },
          disabled: selecteItems?.length !== 1,
          onClick: () => console.log(`/myninds/${selecteItems?.[0]?.id}/new`),
        });
      }

      if (selecteItems?.length == 1) {
        commands.push({
          key: "complete",
          text: "Mark Completed",
          iconProps: { iconName: "SkypeCircleCheck" },
          onClick: () => {
            console.log("completed");
            // handleCompleteTask(selecteItems?.[0]);
          },
        });
      }

      return commands;
    };

  const handleItemSelect = (selectedItems: SampleSales[]) => {
    console.log("From Component", selectedItems);
  };

  return (
    <>
      <section>
        <FluentUIDataGrid
          key="id"
          gridTitle="Test Grid Title"
          gridDescription="Some long description for the grid"
          columns={columns}
          isLoading={loading}
          items={items}
          pageSize={20}
          expandDefaultGroups={true}
          onSelectionChange={handleItemSelect}
          onGetActionMenuItem={handleGetContextMenuItem}
        />
      </section>
    </>
  );
};

export const DataTableExamplePage2: React.FunctionComponent<{}> = (props) => {
  const [items, setItems] = React.useState<SampleSales[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const callApi = async () => {
    try {
      setLoading(true);
      const items = await getAllSalesData();
      setItems(items);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    callApi();
  }, []);

  const handleGetContextMenuItem = (selecteItems: any[]): ICommandBarItemProps[] => {
      let commands: ICommandBarItemProps[] = [
        {
          key: "newItem",
          text: "New Task",
          iconProps: { iconName: "Add" },
          onClick: () => console.log("/myninds/0/new"),
        },
      ];

      if (selecteItems?.length == 1) {
        commands.push({
          key: "edit",
          text: "Edit Task",
          iconProps: { iconName: "Edit" },
          disabled: selecteItems?.length !== 1,
          onClick: () => console.log(`/myninds/${selecteItems?.[0]?.id}/new`),
        });
      }

      if (selecteItems?.length == 1) {
        commands.push({
          key: "complete",
          text: "Mark Completed",
          iconProps: { iconName: "SkypeCircleCheck" },
          onClick: () => {
            console.log("completed");
            // handleCompleteTask(selecteItems?.[0]);
          },
        });
      }

      return commands;
    };

  const handleItemSelect = (selectedItems: SampleSales[]) => {
    console.log("From Component", selectedItems);
  };

  return (
    <>
      <section>
        <FluentUIDataGrid
          key="id"
          columns={columns2}
          isLoading={loading}
          items={items}
          pageSize={20}
          expandDefaultGroups={true}
          onSelectionChange={handleItemSelect}
          onGetActionMenuItem={handleGetContextMenuItem}
        />
      </section>
    </>
  );
};
