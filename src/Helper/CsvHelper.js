export const downloadCSV = (headers = [], data = [], filename = "template.csv") => {
    const csvRows = [];
    const getHeader = [];

    const escapeCSV = (value) => {
        if (value === null || value === undefined) return "";
        const str = String(value);
        const escaped = str.replace(/"/g, '""');
        if (/[",\n]/.test(escaped)) {
            return `"${escaped}"`;
        }
        return escaped;
    };

    //to confirm if header aslo have body
    if (typeof headers[0] === "object" && headers[0] !== null) {

        Object.entries(headers[0]).forEach((val) => {
            if (!Array.isArray(val[1]))
                getHeader.push(escapeCSV(val[0]))
                
            if (Array.isArray(val[1]) && typeof val[1][0] == 'object') {
                const theOptionHeader = val[1].map((v, k) => {
                    getHeader.push(escapeCSV(v.value));
                });
            }            
        });
        csvRows.push(getHeader.join(","));      

    }

    let getBody = [];
    if (headers.length > 0) {
        headers.forEach((header) => {
            getBody = [];
            const getTheBody = Object.values(header);
            getTheBody.forEach((val, key) => {
                if (!Array.isArray(val)) {
                    getBody.push(escapeCSV(val));
                }
                if (Array.isArray(val) && typeof val[0] == 'object') {
                    val.forEach((v, k) => {
                        getBody.push(escapeCSV(v.label));
                    });
                }
            });
            csvRows.push(getBody.join(","));
        });        
        
    };
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
