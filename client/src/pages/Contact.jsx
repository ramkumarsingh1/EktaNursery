import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";

export default function Contact() {
  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <section className="bg-green-700 py-8 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">

          <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mt-3 text-sm text-green-100 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg">
            We'd love to hear from you. Reach out anytime.
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14 lg:py-20">

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">

          {/* Left */}
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6 lg:p-8">

            <h2 className="mb-4 text-2xl font-bold sm:mb-8 sm:text-3xl">
              Get In Touch
            </h2>

            <div className="space-y-5 sm:space-y-6">

              {/* Address */}
              <div className="flex gap-3 sm:gap-4">

                <FiMapPin
                  className="mt-1 shrink-0 text-green-700"
                  size={21}
                />

                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    Address
                  </h3>

                  <p className="text-sm text-gray-600 sm:text-base">
                    Siddharth Niketan, Sector 14, Ghaziabad, Uttar Pradesh, India
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex gap-3 sm:gap-4">

                <FiPhone
                  className="mt-1 shrink-0 text-green-700"
                  size={21}
                />

                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    Phone
                  </h3>

                  <p className="text-sm text-gray-600 sm:text-base">
                    +91 8340728392
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex gap-3 sm:gap-4">

                <FiMail
                  className="mt-1 shrink-0 text-green-700"
                  size={21}
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Email
                  </h3>

                  <p className="break-all text-sm text-gray-600 sm:text-base">
                    support@ektanursery.com
                  </p>
                </div>

              </div>

              {/* Working Hours */}
              <div className="flex gap-3 sm:gap-4">

                <FiClock
                  className="mt-1 shrink-0 text-green-700"
                  size={21}
                />

                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    Working Hours
                  </h3>

                  <p className="text-sm text-gray-600 sm:text-base">
                    Monday - Sunday
                  </p>

                  <p className="text-sm text-gray-600 sm:text-base">
                    9:00 AM - 8:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6 lg:p-8">

            <h2 className="mb-4 text-2xl font-bold sm:mb-8 sm:text-3xl">
              Send Message
            </h2>

            <form className="space-y-4 sm:space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-green-700 sm:p-3 sm:text-base"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-green-700 sm:p-3 sm:text-base"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-green-700 sm:p-3 sm:text-base"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:border-green-700 sm:p-3 sm:text-base"
              ></textarea>

              <button
                type="submit"
                className="rounded-lg bg-green-700 px-6 py-2.5 text-sm text-white transition hover:bg-green-800 sm:px-8 sm:py-3 sm:text-base"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14 lg:pb-20">

        <div className="overflow-hidden rounded-xl shadow">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Ekta Nursery,Siddharth Niketan sector 14, ghaziabad,UttarPradesh&output=embed"
            className="h-[280px] w-full border-0 sm:h-[350px] lg:h-[400px]"
            loading="lazy"
          ></iframe>

        </div>

      </section>

    </div>
  );
}