import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type JsonData = Record<string, any>[];

/**
 * Xuất file Excel từ data JSON, chỉ giữ các key có trong headerMap và đổi tên header
 * @param data - Mảng đối tượng JSON
 * @param fileName - Tên file xuất ra (vd: 'data.xlsx')
 * @param headerMap - Map { key gốc: tên hiển thị }
 */
export function exportExcel(data: JsonData, fileName = "data.xlsx", headerMap?: Record<string, string>): void {
    if (!data || data.length === 0) {
        console.warn("No data to export");
        return;
    }

    let processedData = data;

    // Nếu có headerMap thì lọc và đổi key
    if (headerMap) {
        processedData = data.map((row) => {
            const newRow: Record<string, any> = {};
            for (const key in headerMap) {
                if (row.hasOwnProperty(key)) {
                    newRow[headerMap[key]] = row[key]; // đổi tên key
                }
            }
            return newRow;
        });
    }

    // Tạo worksheet từ json
    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // Format header: font đậm, canh giữa, nền vàng nhạt
    const range = XLSX.utils.decode_range(worksheet["!ref"] as string);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        const cell = worksheet[cellAddress];
        if (!cell) continue;
        cell.s = {
            font: { bold: true },
            alignment: { horizontal: "center" },
            fill: { fgColor: { rgb: "FFFFAA00" } },
        };
    }

    // Auto width
    const colWidths: { wch: number }[] = [];
    const keys = Object.keys(processedData[0]);
    keys.forEach((key, i) => {
        let maxLength = key.length;
        processedData.forEach((row) => {
            const value = row[key] ? String(row[key]) : "";
            if (value.length > maxLength) maxLength = value.length;
        });
        colWidths[i] = { wch: maxLength + 2 };
    });
    worksheet["!cols"] = colWidths;

    // Tạo workbook và save
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
    });

    const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
    });
    saveAs(blob, fileName);
}
