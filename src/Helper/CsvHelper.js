export const downloadCSV = (headers = [], data = [], filename = "template.csv") => {
    const csvRows = [];

    //to confirm if header aslo have body
    if (typeof headers[0] === "object" && headers[0] !== null) {
        // Add headers
        csvRows.push(headers[0].keys.join(","))

        // Add data (optional)
        headers.forEach(row => csvRows.push(row.values.join(",")))
    } else {
        if (headers.length > 0) csvRows.push(headers.join(","));

        data.forEach(row => csvRows.push(row.join(",")));
    }

   

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
