import axios from "axios";
import { CatBreed, CatImageResponse, CombinedBreed, DogBreed } from "./types";
import { shuffleArray } from "./utils/helpers";

export const CAT_API_BASE_URL = "https://api.thecatapi.com/v1/";

export const DOG_API_BASE_URL = "https://api.thedogapi.com/v1/";

const sendRequest = async <T>(url: string): Promise<T> => {
  try {
    const res = await axios.get(url);

    return res.data as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getCatBreedsList = (
  url: string = `${CAT_API_BASE_URL}breeds`
): Promise<CatBreed[]> => {
  return sendRequest<CatBreed[]>(url);
};

export const getDogBreedsList = (
  url: string = `${DOG_API_BASE_URL}breeds`
): Promise<DogBreed[]> => {
  return sendRequest<DogBreed[]>(url);
};

export const getRandomBreedsList = async (): Promise<CombinedBreed[]> => {
  try {
    const breeds = [
      ...(await getCatBreedsList()),
      ...(await getDogBreedsList()),
    ];

    const randomBreeds = shuffleArray(breeds);

    return randomBreeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);

    return [];
  }
};

export const getBreedDetails = (
  id: string,
  breed: "cat" | "dog"
): Promise<CatBreed & DogBreed> => {
  const url = `${
    breed === "cat" ? CAT_API_BASE_URL : DOG_API_BASE_URL
  }breeds/${id}`;

  return sendRequest<CatBreed & DogBreed>(url);
};

export const getBreedPresentators = (
  id: string,
  breed: "cat" | "dog",
  page: number = 1
): Promise<CatImageResponse[]> => {
  const url = `${
    breed === "cat" ? CAT_API_BASE_URL : DOG_API_BASE_URL
  }images/search?limit=10&page=${page}&breed_ids=${id}&api_key=live_Hjl36AyfFsb5S7et5OQMuTt1IAknJrklpbOeOQWMBtqxkC9XQyrLc28Nq58UeRax`;
  return sendRequest<CatImageResponse[]>(url);
};
