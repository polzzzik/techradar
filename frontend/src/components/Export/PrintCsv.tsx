import React from 'react';
import { Button } from '@admiral-ds/react-ui';
import Table from '@assets/icons/table.svg';

interface Item {
  id: number;
  name: string;
}

interface Ring {
  name: string;
  items: Item[];
}

const convertToCSV = (rings: Ring[]): string => {
  const headers = ['Ring Name', 'Item ID', 'Item Name'];
  const csvRows = [headers.join(',')];

  rings.forEach((ring) => {
    ring.items.forEach((item) => {
      const values = [ring.name, item.id, item.name];
      csvRows.push(values.join(','));
    });
  });

  return csvRows.join('\n');
};

const PrintTableButton: React.FC<{ rings: Ring[] }> = ({ rings }) => {
  const downloadCsv = () => {
    const csvData = convertToCSV(rings);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={downloadCsv} dimension="m">
      CSV
      <img src={Table} alt="Printer icon" />
    </Button>
  );
};

export default PrintTableButton;
