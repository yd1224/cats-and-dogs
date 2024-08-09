type Dimensions = { imperial: string; metric: string };

interface AnimalBreed {
  id: number | string;
  name: string;
  weight: Dimensions;
  life_span: string;
  temperament: string;
  origin?: string;
  reference_image_id?: string;
  description?: string;
}

export type CombinedBreed = CatBreed | DogBreed;

export interface CatBreed extends AnimalBreed {
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  country_codes: string;
  country_code: string;
  indoor: number;
  lap?: number;
  alt_names?: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url?: string;
  hypoallergenic: number;
}

export interface DogBreed extends AnimalBreed {
  height: Dimensions;
  bred_for?: string;
  breed_group?: string;
  country_code?: string;
}

export interface PresentatorsApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatImageResponse {
  breeds: CatBreed[];
  id: string;
  url: string;
  width: number;
  height: number;
}
