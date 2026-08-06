import Container from "../layout/Container";
import CategoryCard from "./CategoryCard";
import categories from "../../data/categories";

export default function Categories() {
  return (
    <section className="py-16">

      <Container>

        <h2 className="mb-10 text-center text-4xl font-bold">
          Shop By Category
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              title={category.title}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}