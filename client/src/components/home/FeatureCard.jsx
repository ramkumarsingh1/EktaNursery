
import React from 'react'

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all text-center">

      <div className="flex justify-center">
        <Icon
          size={45}
          className="text-green-700"
        />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

    </div>
  );
}
