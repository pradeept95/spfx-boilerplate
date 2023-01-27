/* eslint-disable */ 
import * as React from "react"; 
import { DataTableGrid } from "../../../common/components/DataTable";
import { IDataGridColumn } from "../../../common/components/DataTable/types/DataTableProps";
import { SampleSales } from "../../shared/models/sample-sales.model";
import { SampleSaleService } from "../../shared/services/SampleSaleService";

const { getAllSalesData } = SampleSaleService();

const columns: IDataGridColumn[] = [
  {
    key: "id",
    name: "id",
    iconName: "Page",
    fieldName: "id",
    isIconOnly: true,
    minWidth: 30,
    maxWidth: 30, 
  },
  {
    key: "region",
    name: "Region",
    fieldName: "region",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    filterType: "multiselect",
  },
  {
    key: "city",
    name: "City",
    fieldName: "city",
    maxWidth: 150,
    isResizable: true,
    minWidth: 130,

    data: "string",
  },
  {
    key: "category",
    name: "Category",
    fieldName: "category",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    data: "string",
  },
  {
    key: "product",
    name: "Product",
    fieldName: "product",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    data: "string",
  },
  {
    key: "quantity",
    name: "Quantity",
    fieldName: "quantity",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    data: "number",
  },
  {
    key: "unitPrice",
    name: "Unit Price",
    fieldName: "unitPrice",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    data: "number",
  },
  {
    key: "totalPrice",
    name: "Total Price",
    fieldName: "totalPrice",
    minWidth: 130,
    maxWidth: 150,
    isResizable: true,
    data: "number",
    filterType: "multiselect",
  },
];

export const DataTableExamplePage1: React.FunctionComponent<{}> = (props) => {

  const [items, setItems] = React.useState<SampleSales[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const callApi = async () => {
    try {
      setLoading(true)
      const items = await getAllSalesData();
      setItems(items)
    } finally {
      setLoading(false)
    }
   
  }

  React.useEffect(() => {
    callApi();
  }, []);


  return (
    <>
      <section> 
        <DataTableGrid 
          gridKeyField="id" 
          loading={loading} 
          items={items} 
          columns={columns} 
          pageSize={20}
          onSelectionChanged={(selectedItems) => { console.log(selectedItems) }}
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
      setLoading(true)
      const items = await getAllSalesData();
      setItems(items)
    } finally {
      setLoading(false)
    }
   
  }

  React.useEffect(() => {
    callApi();
  }, []);


  return (
    <>
      <section> 
        <DataTableGrid 
          gridKeyField="id" 
          loading={loading} 
          items={items?.slice(0, 34)} 
          columns={columns} 
          pageSize={50}

          />
      </section>
    </>
  );
};