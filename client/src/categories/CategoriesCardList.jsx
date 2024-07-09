import CategoryCard from "./CategoryCard"

export default function CategoriesCardList({ categories }) {
  return (
    <div className="ClothingCardList d-flex justify-content-center gap-4">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          id={category.id}
          category={category.name}
          image={category.image_url}
        />
      ))}
    </div>
  );
}