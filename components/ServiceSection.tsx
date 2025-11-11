import SubCategory from "./SubCategory";

export default function ServiceSection({
  category,
  subcategories,
}: {
  category: string;
  subcategories: {
    name: string;
    image: string;
    services: { type: string; price: any; km?: number }[];
  }[];
}) {
  // Decide grid columns based on category
  const gridCols =
    category === "Sedan"
      ? "grid-cols-1 md:grid-cols-2" // Sedan => 2 cards, side by side
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // SUV & Tempo => 3 cards

  return (
    <div
      id={category.toLowerCase().replace(/\s+/g, "-")}
      className="mb-12 pt-10 scroll-mt-24"
    >
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center mb-8">{category}</h2>

      {/* Grid for subcategories */}
      <div className={`grid ${gridCols} gap-8`}>
        {subcategories.map((sub, i) => (
          <SubCategory key={i} sub={sub} category={category} />
        ))}
      </div>
    </div>
  );
}
