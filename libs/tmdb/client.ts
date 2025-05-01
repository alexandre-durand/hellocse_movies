import { DiscoverClient } from "./discover";
import { MovieDetailsClient } from "./movieDetails";
import { SearchClient } from "./search";

export class TMDBClient {
  constructor(private apiKey: string) { }

  discover() {
    return new DiscoverClient(this.apiKey);
  }

  search() {
    return new SearchClient(this.apiKey);
  }

  movieDetails() {
    return new MovieDetailsClient(this.apiKey);
  }
}
