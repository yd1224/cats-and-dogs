import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface BreedImageProps {
  type: "cat" | "dog";
  name?: string;
  id: string;
}

export default function BreedImage({ type, name, id }: BreedImageProps) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageSrc(
      type === "cat"
        ? `https://cdn2.thecatapi.com/images/${id}.jpg`
        : `https://cdn2.thedogapi.com/images/${id}.jpg`
    );
  }, []);

  const fallbackImage =
    type === "cat"
      ? "/images/cat_fallback_img.png"
      : "/images/dog_fallback_img.png";

  return (
    <Image
      src={imageSrc || fallbackImage}
      alt={name || "Image"}
      className="object-cover rounded-lg"
      width={300}
      height={300}
      onError={() => setImageSrc(fallbackImage)}
    />
  );
}
