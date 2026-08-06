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
      <section className="bg-green-700 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-5 text-lg text-green-100">
            We'd love to hear from you. Reach out anytime.
          </p>

        </div>
      </section>

      {/* Contact Section */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left */}

          <div className="rounded-xl bg-white p-8 shadow">

            <h2 className="mb-8 text-3xl font-bold">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">

                <FiMapPin
                  className="mt-1 text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-semibold">
                    Address
                  </h3>

                  <p className="text-gray-600">
                    Patna, Bihar, India
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <FiPhone
                  className="mt-1 text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-semibold">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +91 8340728392
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <FiMail
                  className="mt-1 text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    support@ektanursery.com
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <FiClock
                  className="mt-1 text-green-700"
                  size={24}
                />

                <div>

                  <h3 className="font-semibold">
                    Working Hours
                  </h3>

                  <p className="text-gray-600">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-600">
                    9:00 AM - 7:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-xl bg-white p-8 shadow">

            <h2 className="mb-8 text-3xl font-bold">
              Send Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
              ></textarea>

              <button
                className="rounded-lg bg-green-700 px-8 py-3 text-white hover:bg-green-800"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}

      <section className="mx-auto max-w-6xl px-6 pb-20">

        <div className="overflow-hidden rounded-xl shadow">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Patna,Bihar&output=embed"
            className="h-[400px] w-full border-0"
            loading="lazy"
          ></iframe>

        </div>

      </section>

    </div>
  );
}