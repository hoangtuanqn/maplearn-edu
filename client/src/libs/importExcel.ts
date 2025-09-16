import * as XLSX from "xlsx";

/**
 * Hàm đọc Excel và map cột
 * @param file File Excel người dùng upload
 * @param columnMapping Mapping cột Excel -> cột mong muốn
 * @returns Promise<any[]>
 */
export async function importExcel(file: File, columnMapping: Record<string, string>): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (evt) => {
            try {
                const data = evt.target?.result;
                const workbook = XLSX.read(data, { type: "binary" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Parse raw JSON từ sheet (defval: null để không bị undefined)
                const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: null });

                // Map và chỉ giữ cột có trong mapping
                const mappedJson = rawJson.map((row) => {
                    const newRow: any = {};
                    for (const key in columnMapping) {
                        let value = row[key];

                        if (typeof value === "string") {
                            // Bỏ ký tự ' ở đầu nếu có
                            value = value.replace(/^'/, "").trim();
                        }

                        newRow[columnMapping[key]] = value !== undefined ? value : null;
                    }
                    return newRow;
                });

                resolve(mappedJson);
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsBinaryString(file);
    });
}
