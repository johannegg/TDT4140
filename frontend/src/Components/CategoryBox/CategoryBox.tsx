import { Dispatch, SetStateAction } from "react";
import { categories } from "./utils/categories";
import "./CategoryBox.css";

interface Props {
  checkedCategories: Array<string>;
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
}

const CategoryBox = ({ checkedCategories, setCheckedCategories }: Props) => {
  const handleOnChange = (position: number) => {
    const updatedCategories = [...checkedCategories];
    if (updatedCategories.includes(categories[position])) {
      setCheckedCategories(
        updatedCategories.filter(
          (category) => category !== categories[position]
        )
      );
    } else {
      updatedCategories.push(categories[position]);
      setCheckedCategories(updatedCategories);
    }
  };
  return (
    <div>
      <p className="kategoriTittel">Kategorier</p>
      {categories.map((category, index) => {
        return (
          <div>
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              value={category}
              onChange={() => handleOnChange(index)}
              className="categoryCheck"
            />
            <label
              htmlFor={`custom-checkbox-${index}`}
              className="categoryLabel"
            >
              {category}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBox;
