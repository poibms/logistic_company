import React from 'react';
import { writeFile, utils, WorkBook } from 'xlsx';
import { OrderType } from '../../../types/types';

const ExportExcelButton: React.FC<{ orders: OrderType[] }> = ({ orders }) => {
  const handleExportExcel = () => {
    const worksheet = utils.json_to_sheet(formatOrders(orders));
    const workbook: WorkBook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelData = writeFile(workbook, 'order.xlsx');
    saveAsExcelFile(excelData, 'orders.xlsx');
  };

  const formatOrders = (orders: OrderType[]) => {
    return orders.map((order) => ({
      ...order,
      'ownerId': order.ownerId.id,
      'driverid': order.driverId?.id ?? ''
    }));
  };

  const saveAsExcelFile = (data: any, filename: string) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    link.remove(); // Remove the link element after the file has been downloaded
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExportExcel} className='button'>
      Export to Excel
    </button>
  );
};

export default ExportExcelButton;
