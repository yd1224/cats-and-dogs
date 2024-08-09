import { CatBreed, DogBreed } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import BreedImage from "./breed-image";

export interface BreedCardProps {
  breed: CatBreed | DogBreed;
}

export default function BreedCard({ breed }: BreedCardProps) {
  const breedType = "dog_friendly" in breed ? "cat" : "dog";

  return (
    <Link href={`/breed/${breed.id}?type=${breedType}`}>
      <div className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 bg-white cursor-pointer w-60 xs:w-80 sm:w-72 md:w-72 lg:w-68 xl:w-60 h-80 sm:h-80 md:h-84 lg:h-80 xl:h-102">
        <div className="w-full h-60 overflow-hidden rounded-t-lg">
          <BreedImage
            type={breedType}
            name={breed?.name}
            id={breed?.reference_image_id ?? ""}
          />
        </div>
        <div className="p-3">
          <h2 className="mt-1 text-lg font-semibold truncate text-gray-800 text-center">
            {breed.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}
