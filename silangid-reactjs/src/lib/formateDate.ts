export const formateDate = (date: string) => {
    const formatted = new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return formatted;
};