/* eslint-disable */
import * as React from "react";
import { SampleSaleService } from "../../shared/services/SampleSaleService";
import { SampleSales } from "@app/shared/models/sample-sales.model";
import { Table, createColumnHelper } from "@prt-ts/fluent-react-table-v2";
import { useTrackPageView } from "@common/hooks/useTrackPageView";

const { getAllSalesData } = SampleSaleService();

export const TableExample2: React.FunctionComponent<{}> = (props) => {
  
  useTrackPageView({
    name: "Table Example 2",
  });

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

  const columnHelper = createColumnHelper<SampleSales>();

  const column = [
    columnHelper.accessor("id", {
      id: "ID", 
      header: "ID",
      aggregatedCell: () => null,
      filterFn: "arrIncludesSome",
    }),
    columnHelper.accessor("region", {
      id: "Region",
      header: "Region",
      aggregatedCell: () => null,
    }),
    columnHelper.accessor("city", {
      id: "City",
      header: "City",
      aggregatedCell: () => null,
    }),
    columnHelper.accessor("category", {
      id: "Category",
      header: "Category",
      aggregationFn: "uniqueCount",
    }),
    columnHelper.accessor("product", {
      id: "Product",
      header: "Product",
      aggregationFn: "uniqueCount",
    }),
    columnHelper.accessor("quantity", {
      id: "Quantity",
      header: "Quantity", 
      filterFn: "inNumberRange",
    }),
    columnHelper.accessor("unitPrice", {
      id: "Unit Price",
      header: "Unit Price",
      aggregationFn: "mean",
      filterFn: "inNumberRange",
    }),

    columnHelper.accessor("totalPrice", {
      id: "Total Price",
      header: "Total Cost", 
      aggregationFn: "sum",
      filterFn: "inNumberRange",
    }),
  ];

  const tableHeader = React.useMemo(() => {
    return (
      <div className="flex justify-between">
        <div className="text-lg font-bold">Sample Sales</div> 
      </div>
    );
  }, []);

  return (
    <>
      <Table
        columns={column}
        data={items}
        isLoading={loading}
        gridTitle={tableHeader}
        pageSize={20} 
      />
    </>
  );
};
