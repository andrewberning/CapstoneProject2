import CategoriesCard from "./CategoriesCard"

export default function CategoriesCardList({ categories }) {
  return (
    <div className="ClothingCardList d-flex justify-content-center gap-4">
      {categories.map(category => (
        <CategoriesCard
          key={category.title}
          category={category.title}
        />
      ))}
    </div>
  );
}