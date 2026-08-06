import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-14">

          {/* Left */}
          <div>

            <p className="text-green-700 font-semibold mb-3">
              Welcome to Ekta Nursery
            </p>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Bring Nature
              <br />
              To Your Home 
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Discover healthy plants, decorative pots,
              flowering plants and gardening essentials
              delivered with care.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link to="/shop">
                <Button className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800">
                  Shop Now
                </Button>
              </Link>

              <Link to="/about">
                <Button className="border border-green-700 text-green-700 px-8 py-3 rounded-xl hover:bg-green-100">
                  Learn More
                </Button>
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800"
              alt="Plant"
              className="w-full max-w-md rounded-3xl shadow-xl"
            />

          </div>

        </div>
      </Container>
    </section>
  );
}