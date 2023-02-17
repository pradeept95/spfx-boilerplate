/* eslint-disable */
import { saveAs } from "file-saver";
import AppContext from "../config/app-context.config";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ExportObjectModel } from "../types/export-object.type";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const currrentContext = AppContext.getInstance();
export const ExportService = () => {
  (async () => {})();

  const exportToPDF = async (
    docDefinition: any,
    fileName: string = "document",
    printMode: "print" | "open" | "download" = "print",
    isLandscape: boolean = false
  ) => {
    // get current user
    const user = currrentContext.context.pageContext.user;

    // deep copy
    const defination = JSON.parse(JSON.stringify(docDefinition));

    // define pdf oriantation
    defination.pageOrientation = isLandscape ? "landscape" : "portrait";

    // info to pdf
    defination.info = {
      title: fileName,
      author: user.displayName,
      subject: "Exported Document",
      keywords: "pdf",
    };

    // perform appropriate action based on user choice
    if (printMode == "print") {
      pdfMake.createPdf(defination).print();
    } else if (printMode == "download") {
      pdfMake.createPdf(defination).download(fileName);
    } else {
      pdfMake.createPdf(defination).open();
    }
  };

  const exportToExcel = (
    fileName: string,
    exportData: ExportObjectModel[]
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        import("xlsx").then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(exportData);
          const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ["data"],
          };
          const excelBuffer: any = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });

          let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          let EXCEL_EXTENSION = ".xlsx";
          const data: Blob = new Blob([excelBuffer], {
            type: EXCEL_TYPE,
          });
          saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const exportToCSV = (
    fileName: string,
    exportData: ExportObjectModel[]
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        import("xlsx").then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(exportData);
          const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ["data"],
          };
          const excelBuffer: any = xlsx.write(workbook, {
            bookType: "csv",
            type: "array",
          });

          let CSV_TYPE = "data:text/csv;charset=utf-8";
          let CSV_EXTENSION = ".csv";
          const data: Blob = new Blob([excelBuffer], {
            type: CSV_TYPE,
          });
          saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + CSV_EXTENSION
          );
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    exportToPDF,
    exportToExcel,
    exportToCSV,
  };
};
