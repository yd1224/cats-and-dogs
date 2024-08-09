"use client";

import BreedImage from "@/app/components/breed-image";
import ImageList from "@/app/components/image-list";
import Label from "@/app/components/label";
import Loader from "@/app/components/loader";
import { getBreedDetails } from "@/lib/api";
import { CatBreed, DogBreed } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";

export interface BreedPageProps {
  params: {
    id: string;
  };
  searchParams: {
    type: "cat" | "dog";
  };
}

export default function BreedPage({ params, searchParams }: BreedPageProps) {
  const queryKey = useMemo(() => ["BreedDetails", params.id], [params.id]);

  const { data, isError, isLoading } = useQuery<CatBreed & DogBreed>({
    queryKey,
    queryFn: () => getBreedDetails(params.id, searchParams.type),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) notFound();

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 max-w-full">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <BreedImage
            type={searchParams.type}
            name={data?.name}
            id={data?.reference_image_id || ""}
          />
          <div className="mt-4">
            <Link
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
              href="/"
            >
              Back to Home
            </Link>
          </div>

        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 text-center md:text-left">
          <div className="flex items-center mb-2 justify-center md:justify-start">
            <h2 className="text-2xl font-semibold text-gray-800">
              {data?.name}
            </h2>
          </div>
          <Label text="Life span:" color="green">
            {data?.life_span ?? "undefined"}
          </Label>
          <Label text="Temperament:" color="orange">
            {data?.temperament ?? "undefined"}
          </Label>
          <Label text="Origin:" color="red">
            {data?.origin ?? "undefined"}
          </Label>

          {data?.description && (
            <Label text="Description:" color="blue">
              <span className="font-semibold">{data.description}</span>
            </Label>
          )}
          {data?.bred_for && (
            <Label text="Bred for:" color="pink">
              <span className="font-semibold"> {data.bred_for}</span>
            </Label>
          )}
        </div>
      </div>
      <h2 className="text-center my-8 font-bold text-2xl">Photo Gallery</h2>
      <ImageList breedId={params.id} breedType={searchParams.type} />
    </>
  );
}
