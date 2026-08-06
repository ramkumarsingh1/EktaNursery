import React from "react";

export default function CategoryCard({ image, title }) {
  return (
    <div className="group cursor-pointer">

      <div className="overflow-hidden rounded-2xl">

        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

      </div>

      <h3 className="mt-4 text-center text-xl font-semibold">
        {title}
      </h3>

    </div>
  );
}