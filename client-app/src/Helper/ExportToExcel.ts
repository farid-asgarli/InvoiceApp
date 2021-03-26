import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export  const exportToXLS = (apiData:any, fileName:string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(data, fileName + ".xlsx");
  };