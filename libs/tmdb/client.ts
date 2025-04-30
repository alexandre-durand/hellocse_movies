import { DiscoverClient } from "./discover";
import { SearchClient } from "./search";

export class TMDBClient {
  constructor(private apiKey: string) {}

  discover() {
    return new DiscoverClient(this.apiKey);
  }

  search() {
    return new SearchClient(this.apiKey);
  }
}
