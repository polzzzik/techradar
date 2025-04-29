import { pdf } from '@react-pdf/renderer';
import Template from './Template';
import { Button } from '@admiral-ds/react-ui';
import Printer from '@assets/icons/printer.svg';

const PrintButton = () => {
  const downloadPdf = async () => {
    const blob = await pdf(<Template />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Button onClick={downloadPdf} dimension="m">
      PDF
      <img src={Printer} alt="" />
    </Button>
  );
};

export default PrintButton;
