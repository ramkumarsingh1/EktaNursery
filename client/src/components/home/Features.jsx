import Container from "../layout/Container";
import FeatureCard from "./FeatureCard";
import features from "../../data/features";

export default function Features() {
  return (
    <section className="py-20 bg-green-50">

      <Container>

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Ekta Nursery?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}