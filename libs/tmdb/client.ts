import { DiscoverClient } from "./discover";

export class TMDBClient {
    constructor(private apiKey: string) {}

    discover() {
        return new DiscoverClient(this.apiKey);
    }
}