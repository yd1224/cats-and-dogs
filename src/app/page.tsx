import { getRandomBreedsList } from "@/lib/api";
import getQueryClient from "@/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import BreedList from "./components/breed-list";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["BreedsData"],
    queryFn: () => getRandomBreedsList(),
    staleTime: Infinity,
  });

  const dehydratedState = dehydrate(queryClient);

  const initialData = queryClient.getQueryData(["BreedsData"]);

  if (!initialData) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <HydrationBoundary state={dehydratedState}>
        <BreedList />
      </HydrationBoundary>
    </main>
  );
}
