import React, { Dispatch, SetStateAction, useState } from "react";
import { categories } from "./utils/categories";
import "./CategoryBox.css";

// interface Props {
//   filterCategories: Dispatch<SetStateAction<boolean[]>>;
// }

const CategoryBox = (/* { filterCategories }: Props */) => {
//   const [checkedState, setCheckedState] = useState(
//     new Array(categories.length).fill(false)
//   );
//   const handleOnChange = (position: number) => {
//     checkedState[position] = !checkedState[position];
//     filterCategories(checkedState);
//   };
  return (
    <div>
      <p className="kategoriTittel">Kategorier</p>
      {categories.map((category, index) => {
        // console.log(category, index);
        return (
          <div>
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              value={category}
            //   onChange={() => handleOnChange(index)}
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
