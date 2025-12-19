export const downloadCSV = (data, filename = "template.csv") => {
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

    const getHighestOptionLength = (getData) => {
        let maxLength = 0;
        let maxIndex = -1;

        getData.forEach((opt, i) => {
            if (!opt || !Array.isArray(opt.options))
                return;

            if (opt.options.length > maxLength) {
                maxLength = opt.options.length;
                maxIndex = i;
            }
        });

        return { maxIndex, maxLength };
    };
    
    const toAllowTemplate = typeof data === 'object' && !Array.isArray(data) ? true : false;
    const { maxIndex, maxLength } = getHighestOptionLength(data);
    let getPosition = 0;
    if (toAllowTemplate) {
        data = [data]; //to ensure it is in list format for template.csv
    } else {        
        getPosition = maxIndex === -1 ? 0 : maxIndex;
    }
        

    
    let provideAnswerPosition = 0;

    if (typeof data[getPosition] === "object" && data[getPosition] !== null) {

        Object.entries(data[getPosition]).forEach((val, k) => {
            if (!Array.isArray(val[1])) {
                getHeader.push(escapeCSV(val[0]))

                if (val[0] === "provideAnswer")
                    provideAnswerPosition = k+1;
            }
                

                
            if (Array.isArray(val[1]) && typeof val[1][0] == 'object') {
                const theOptionHeader = val[1].map((v, k) => {
                    if (!v.value)
                        return; // this is only meant for options in a question component
                    getHeader.push(escapeCSV(v.value));

                    if (k === (val[1].length - 1))
                        getHeader.push(escapeCSV("Answers"));
                });
            }            
        });
        csvRows.push(getHeader.join(","));      

    }

    let getBody = [];
    const toAllowSpace = data[getPosition].options && Array.isArray(data[getPosition].options) ?  data[getPosition].options.length : 0;
    
    if (data.length > 0 && !toAllowTemplate) {
        data.forEach((body, keyOfVal) => {
            getBody = [];
            const getTheBody = Object.values(body);
            
            getTheBody.forEach((val, key) => {
                let getTheAnswers = "";
                if (!Array.isArray(val)) {

                    //to put space for question component without options
                    if (key === provideAnswerPosition && maxLength > 0) {
                        console.log("kk", key, provideAnswerPosition, maxLength)
                        for (let i = 0; i < maxLength; i++) {
                            getBody.push("");
                        }
                        getBody.push(""); //for answer in question component
                    }
                    //end of logic
                    getBody.push(escapeCSV(val));

                }

                if (Array.isArray(val) && typeof val[0] == 'object') {
                    val.forEach((v, k) => {
                        if (!v.value)
                            return; // this is only meant for options in a question component

                        getBody.push(escapeCSV(v.label));
                        if (toAllowSpace != val.length && k === val.length - 1)
                            getBody.push(""); //incase the length of options is lesser than that of the highest

                        getTheAnswers += v.isCorrect ? v.value : "";
                        if (k === val.length - 1)
                            getBody.push(escapeCSV(getTheAnswers));
                    });
                }
            }); 
            csvRows.push(getBody.join(","));
        });        
    };
    //exit();
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
