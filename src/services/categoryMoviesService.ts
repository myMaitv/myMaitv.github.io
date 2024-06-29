import type { CategoryMoviesResponse } from "./types";
import axios from "axios";
import { useCategoryMovieStore } from "../stores/movie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export const getCategoryMovies = async (
  categorySlug: string,
  page: number = 1,
  limit: number = 8
): Promise<CategoryMoviesResponse> => {
  const store = useCategoryMovieStore();
  try {
    let data;
    if (store.apiRes[categorySlug]) {
      data = store.apiRes[categorySlug];
    } else {
      const response = await api.get<CategoryMoviesResponse>(
        `/v1/api/danh-sach/${categorySlug}?page=${page}&limit=${limit}`
      );
      data = response.data;
      store.setApiRes(categorySlug, response.data);
      setTimeout(() => {
        store.clearApiRes(categorySlug);
      }, 5 * 60 * 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch category movies: ${error.message}`);
    } else {
      throw new Error("Failed to fetch category movies");
    }
  }
};