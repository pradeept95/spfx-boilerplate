/* eslint-disable */
import { IColumn } from "@fluentui/react";
import * as React from "react";
import { DataTableGrid } from "../../common/components/DataTable";
import { SampleSales } from "../shared/models/sample-sales.model";
import { SampleSaleService } from "../shared/services/SampleSaleService";

const { getAllSalesData } = SampleSaleService();

const columns: IColumn[] = [
  {
    key: 'region',
    name: 'Region',
    iconName: 'Page',
    fieldName: 'region',
    minWidth: 100,
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
  {
    key: 'city',
    name: 'City',
    fieldName: 'city',
    minWidth: 100,
    maxWidth: 350,
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    data: 'string',
    isPadded: true,
  },
  {
    key: 'category',
    name: 'Category',
    fieldName: 'category',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    data: 'string',
    isPadded: true,
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
  {
    key: 'product',
    name: 'Product',
    fieldName: 'product',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    data: 'string',
    isPadded: true,
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
  {
    key: 'quantity',
    name: 'Quantity',
    fieldName: 'quantity',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsible: true,
    data: 'number',
    isPadded: true,
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
  {
    key: 'unitPrice',
    name: 'Unit Price',
    fieldName: 'unitPrice',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsible: true,
    data: 'number',
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
  {
    key: 'totalPrice',
    name: 'Total Price',
    fieldName: 'totalPrice',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsible: true,
    data: 'number',
    isSorted: false,
    isSortedDescending: false,
    showSortIconWhenUnsorted: true
  },
];

const DataTableExamplePage: React.FunctionComponent<{}> = (props) => {

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
        <DataTableGrid loading={loading} items={items} columns={columns} />
      </section>
    </>
  );
};

export default DataTableExamplePage;