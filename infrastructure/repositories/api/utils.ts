export function buildTMBDImageURL(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
}

export function parseTMBDDate(date: string): Date {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format: ${date}`);
    }
    return parsedDate;
}