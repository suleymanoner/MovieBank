export interface Response {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface ResponseWithDates {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DateInResponse {
  maximum: string;
  minimum: string;
}

export interface MovieWithDates {
  dates: DateInResponse;
  movies: Movie[];
}

export interface MovieState {
  now_playing: MovieWithDates;
  top_rated: Movie[];
  popular: Movie[];
  upcoming: MovieWithDates;
  indv_movie: IndvMovie;
  search_results: Movie[];
  fav_movies: Movie[];
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IndvMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreResponse {
  genres: Genre[];
}
