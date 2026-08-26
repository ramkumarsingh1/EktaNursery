import {
  FiTruck,
  FiAward,
  FiUsers,
} from "react-icons/fi";
import AboutHero from "../components/about/AboutHero";

export default function About() {
  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <AboutHero />

      {/* Our Story */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
            alt="Nursery"
            className="w-full rounded-xl shadow-md sm:rounded-2xl"
          />

          <div>

            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
              Our Story
            </h2>

            <p className="mb-4 text-sm leading-6 text-gray-600 sm:mb-5 sm:text-base sm:leading-7 lg:leading-8">
              Ekta Nursery was created with one simple goal —
              to make greenery accessible to everyone.
              We carefully select healthy plants, stylish pots,
              quality fertilizers, and gardening essentials
              for every home and office.
            </p>

            <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 lg:leading-8">
              Our mission is to inspire people to build
              greener, healthier, and happier living spaces.
            </p>

          </div>

        </div>

      </section>

      {/* Why Choose */}
      <section className="bg-white py-10 sm:py-14 lg:py-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <h2 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl lg:mb-12 lg:text-4xl">
            Why Choose Us
          </h2>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Healthy Plants */}
            <div className="rounded-lg bg-green-50 p-5 text-center shadow-sm sm:rounded-xl sm:p-6">

              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Healthy Plants
              </h3>

              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Fresh and carefully nurtured plants.
              </p>

            </div>

            {/* Fast Delivery */}
            <div className="rounded-lg bg-green-50 p-5 text-center shadow-sm sm:rounded-xl sm:p-6">

              <FiTruck
                className="mx-auto mb-3 text-green-700 sm:mb-4"
                size={34}
              />

              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Fast Delivery
              </h3>

              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Safe and quick doorstep delivery.
              </p>

            </div>

            {/* Premium Quality */}
            <div className="rounded-lg bg-green-50 p-5 text-center shadow-sm sm:rounded-xl sm:p-6">

              <FiAward
                className="mx-auto mb-3 text-green-700 sm:mb-4"
                size={34}
              />

              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Premium Quality
              </h3>

              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Best gardening products at affordable prices.
              </p>

            </div>

            {/* Happy Customers */}
            <div className="rounded-lg bg-green-50 p-5 text-center shadow-sm sm:rounded-xl sm:p-6">

              <FiUsers
                className="mx-auto mb-3 text-green-700 sm:mb-4"
                size={34}
              />

              <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">
                Happy Customers
              </h3>

              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Thousands of satisfied plant lovers.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">

        <div className="grid gap-5 sm:gap-8 lg:grid-cols-2">

          <div className="rounded-xl bg-green-100 p-6 sm:p-8">

            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
              Our Mission
            </h2>

            <p className="text-sm leading-6 text-gray-700 sm:text-base sm:leading-7 lg:leading-8">
              To encourage sustainable living by making
              gardening simple, enjoyable, and affordable
              for everyone.
            </p>

          </div>

          <div className="rounded-xl bg-green-700 p-6 text-white sm:p-8">

            <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
              Our Vision
            </h2>

            <p className="text-sm leading-6 sm:text-base sm:leading-7 lg:leading-8">
              To become India's most trusted online nursery
              where every home is filled with greenery.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="bg-green-700 py-10 text-white sm:py-14 lg:py-16">

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-7 gap-x-4 px-4 text-center sm:gap-8 sm:px-6 lg:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              1000+
            </h2>
            <p className="mt-1 text-sm sm:text-base">
              Plants
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              500+
            </h2>
            <p className="mt-1 text-sm sm:text-base">
              Customers
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              50+
            </h2>
            <p className="mt-1 text-sm sm:text-base">
              Cities
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              24×7
            </h2>
            <p className="mt-1 text-sm sm:text-base">
              Support
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}