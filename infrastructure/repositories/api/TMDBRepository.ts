export class TMDBRepository {
    protected buildImageURL(path: string): string {
        return `https://image.tmdb.org/t/p/original${path}`;
    }

    protected parseDate(date: string): Date {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date format: ${date}`);
        }
        return parsedDate;
    }
}