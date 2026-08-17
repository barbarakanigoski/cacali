"use client";

import { useState } from "react";

export function ProductGallery({
  mainImage,
  images,
  name,
}: {
  mainImage: string;
  images: string[];
  name: string;
}) {
  const allImages = [mainImage, ...images].filter(Boolean);
  const [selected, setSelected] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-bege/30 rounded-3xl flex items-center justify-center">
        <span className="text-marrom/15 text-6xl font-bold">cacali</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-bege/30 rounded-3xl overflow-hidden">
        <img
          src={allImages[selected]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selected === i
                  ? "border-pink shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
