import qrcode, { QRCodeToStringOptions } from "qrcode";
import pdfmake, {
  createPdf,
  TDocumentDefinitions
} from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfmake.vfs = pdfFonts.pdfMake.vfs;

export function generateQRCodeAsync(
  text: string,
  options: QRCodeToStringOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    qrcode.toString(text, options, (err, url) => {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

export function download(svg: string) {
  const docDefenitions: TDocumentDefinitions = {
    content: [{ svg, width: 200 }]
  };

  createPdf(docDefenitions).download();
}
