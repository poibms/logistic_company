import * as React from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { OrderType, TruckType, DriverType } from "../../../types/types";

type TablePropsType = {
  dataType: string;
  rows: OrderType[] | TruckType[] | DriverType[];
  searchHandler: any;
};

const columns = {
  orders: [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "weight", headerName: "Weight", width: 160 },
    { field: "from", headerName: "From", width: 160 },
    { field: "to", headerName: "To", width: 160 },
    {
      field: "driverId",
      headerName: "driver",
      width: 160,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.driverId ? `${params.row.driverId.name || ""} ${params.row.driverId.surname || ""}` : 'null'
      }
    },
    {
      field: "ownerId",
      headerName: "Owner",
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>{
        return params.row.ownerId ? `${params.row.ownerId.name || ""} ${params.row.ownerId.surname || ""}` : 'null'
      }
    },
    { field: "status", headerName: "Status", width: 120 },
  ],
  drivers: [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "surname", headerName: "Surname", width: 160 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "age", headerName: "Age", width: 160 },
    {
      field: "truckId",
      headerName: "Truck",
      width: 160,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.truckId ? `${params.row.truckId.name || ""} ${params.row.truckId.model || ""}` : 'null'
    }
    },
  ],
  trucks: [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "model", headerName: "Model", width: 160 },
    { field: "year", headerName: "Year", width: 160 },
    { field: "loadCapacity", headerName: "LoadCapacity", width: 160 },
    {
      field: "driverId",
      headerName: "Driver",
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>{
        return params.row.driverId ? `${params.row.driverId.name || ""} ${params.row.driverId.surname || ""}` : 'null'
      }
    },
  ],
};

const DataTable: React.FC<TablePropsType> = ({
  dataType,
  rows,
  searchHandler,
}) => {
  const genTableParams = () => {
    if (dataType === "orders") {
      return (
        <DataGrid
          rows={rows as OrderType[]}
          columns={columns.orders}
          autoHeight={true}
          onRowClick={(e) => searchHandler(e, e.row)}
        />
      );
    } else if (dataType === "drivers") {
      return (
        <DataGrid
          rows={rows as DriverType[]}
          columns={columns.drivers}
          onRowClick={(e) => searchHandler(e, e.row)}
        />
      );
    } else {
      return (
        <DataGrid
          rows={rows as TruckType[]}
          columns={columns.trucks}
          onRowClick={(e) => searchHandler(e, e.row)}
        />
      );
    }
  };

  const Table = genTableParams();

  return <div style={{ height: 400, width: "100%" }}>{Table}</div>;
};

export default DataTable;
