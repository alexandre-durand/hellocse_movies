export function formatMinutesToHourMinute(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const numberFormatter = new Intl.NumberFormat('en-US');

    if (hours > 0 && minutes > 0) {
        return `${numberFormatter.format(hours)}h ${numberFormatter.format(minutes)}`;
    } else if (hours > 0) {
        return `${numberFormatter.format(hours)}h`;
    } else {
        return `${numberFormatter.format(minutes)}min`;
    }
}