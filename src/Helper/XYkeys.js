export const  getKeysForChart = (data) => {
    if (!Array.isArray(data) || data.length === 0) return {};

    const sample = data[0];
    const xKey = Object.keys(sample).find(k => typeof sample[k] === "string");
    const yKey = Object.keys(sample).find(k => typeof sample[k] === "number");
    return { xKey, yKey };
};