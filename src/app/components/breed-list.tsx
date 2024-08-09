"use client";

import { getRandomBreedsList } from "@/lib/api";
import { CombinedBreed } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import BreedCard from "./breed-card";
import Gallery from "./gallery";

export default function BreedList() {
  const { data, isError } = useQuery<CombinedBreed[]>({
    queryKey: ["BreedsData"],
    queryFn: () => getRandomBreedsList(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (!data || isError) {
    notFound();
  }

  return (
    <Gallery>
      {data.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </Gallery>
  );
}
