import { getBreedPresentators } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { CatImageResponse } from "@/lib/types";
import { all } from "axios";
import Gallery from "./gallery";
import BreedImage from "./breed-image";
import Loader from "./loader";

interface ImageListProps {
  breedId: string;
  breedType: "cat" | "dog";
}

export default function ImageList({ breedId, breedType }: ImageListProps) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery<CatImageResponse[], Error>({
      staleTime: Infinity,
      queryKey: ["images", breedId],
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length > 10) return undefined;
        if (lastPage.length < 10) return undefined;

        return (allPages.length + 1) as number;
      },
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) =>
        getBreedPresentators(breedId, breedType, pageParam as number),
    });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="px-8">
      <Gallery>
        {data?.pages.flatMap((page, index) =>
          page.map((image) => (
            <BreedImage
              key={`${index}-${image.id}`}
              id={image.id}
              name={`Breed ${image.id}`}
              type={breedType}
            />
          ))
        )}
      </Gallery>
      {isFetchingNextPage && <Loader />}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => fetchNextPage()}
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
