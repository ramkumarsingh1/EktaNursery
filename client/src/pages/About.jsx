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
      <AboutHero/>

      {/* Our Story */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
            alt="Nursery"
            className="rounded-2xl shadow-lg"
          />

          <div>

            <h2 className="mb-6 text-4xl font-bold">
              Our Story
            </h2>

            <p className="mb-5 text-gray-600 leading-8">
              Ekta Nursery was created with one simple goal —
              to make greenery accessible to everyone.
              We carefully select healthy plants, stylish pots,
              quality fertilizers, and gardening essentials
              for every home and office.
            </p>

            <p className="text-gray-600 leading-8">
              Our mission is to inspire people to build
              greener, healthier, and happier living spaces.
            </p>

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Choose Us
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-green-50 p-6 text-center shadow">

              <h3 className="mb-3 text-xl font-semibold">
                Healthy Plants
              </h3>

              <p className="text-gray-600">
                Fresh and carefully nurtured plants.
              </p>

            </div>

            <div className="rounded-xl bg-green-50 p-6 text-center shadow">

              <FiTruck
                className="mx-auto mb-4 text-green-700"
                size={42}
              />

              <h3 className="mb-3 text-xl font-semibold">
                Fast Delivery
              </h3>

              <p className="text-gray-600">
                Safe and quick doorstep delivery.
              </p>

            </div>

            <div className="rounded-xl bg-green-50 p-6 text-center shadow">

              <FiAward
                className="mx-auto mb-4 text-green-700"
                size={42}
              />

              <h3 className="mb-3 text-xl font-semibold">
                Premium Quality
              </h3>

              <p className="text-gray-600">
                Best gardening products at affordable prices.
              </p>

            </div>

            <div className="rounded-xl bg-green-50 p-6 text-center shadow">

              <FiUsers
                className="mx-auto mb-4 text-green-700"
                size={42}
              />

              <h3 className="mb-3 text-xl font-semibold">
                Happy Customers
              </h3>

              <p className="text-gray-600">
                Thousands of satisfied plant lovers.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-xl bg-green-100 p-8">

            <h2 className="mb-4 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="leading-8 text-gray-700">
              To encourage sustainable living by making
              gardening simple, enjoyable, and affordable
              for everyone.
            </p>

          </div>

          <div className="rounded-xl bg-green-700 p-8 text-white">

            <h2 className="mb-4 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="leading-8">
              To become India's most trusted online nursery
              where every home is filled with greenery.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-green-700 py-16 text-white">

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold">1000+</h2>
            <p>Plants</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p>Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">50+</h2>
            <p>Cities</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">24×7</h2>
            <p>Support</p>
          </div>

        </div>

      </section>

    </div>
  );
}