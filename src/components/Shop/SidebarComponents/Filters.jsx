// Filters component
import React from "react";

const Filters = ({
  selectedCategories = [],
  selectedColors = [],
  selectedSubCategories = [],
  onCategoryRemove,
  onColorRemove,
  onSubCategoriesRemove,
}) => {
  const handleRemoveCategory = (category) => {
    onCategoryRemove(category);
  };

  const handleRemoveColor = (color) => {
    onColorRemove(color);
  };

  const handleRemoveSubCategory = (subCategory) => {
    onSubCategoriesRemove(subCategory);
  };

  return (
    <>
      <div className="filter-category">
        <div className="filter-title">
          <h2>Filters</h2>
          <a href="javascript:void(0)">Clear All</a>
        </div>
        <ul>
          {selectedCategories && selectedCategories.map((category) => (
            <li key={category} onClick={() => handleRemoveCategory(category)}>
              <span>{category}</span>
            </li>
          ))}
          {selectedColors && selectedColors.map((color) => (
            <li key={color} onClick={() => handleRemoveColor(color)}>
              <span>{color}</span>
            </li>
          ))}
          {selectedSubCategories && selectedSubCategories.map((subCategory) => (
            <li key={subCategory} onClick={() => handleRemoveSubCategory(subCategory)}>
              <span>{subCategory}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filters;
