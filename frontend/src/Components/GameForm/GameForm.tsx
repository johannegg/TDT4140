import React, { useState } from "react";
import "./GameForm.css";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "0", name: "Family:" },
  { id: "1", name: "Party:" },
  { id: "2", name: "Children:" },
  { id: "3", name: "Indoor:" },
  { id: "4", name: "Outdoor:" },
  { id: "5", name: "Quiz:" },
  { id: "6", name: "Music quiz:" },
  { id: "7", name: "Student:" },
  { id: "8", name: "One player:" },
  { id: "9", name: "Team building:" },
];

type GameFormProps = {
  onSubmit: (data: any) => void;
};

export function GameForm({ onSubmit }: GameFormProps) {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [rules, setRules] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelectedCategories);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name,
      shortDescription,
      rules,
      categories: selectedCategories,
    };
    onSubmit(formData);
  };

  return (
    <div className="game-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name of the game:
          <input className="input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Short description of the game:
          <input className="input"
            type="text"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          The rules of the game:
          <br />
          <textarea className="description"
            required
            rows={4}
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />
        </label>
        <br />
        <br />
        <div>
          {categories.map((category) => (
            <label key={category.id} className="checkBox">
              {category.name}
              <input 
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={handleCategoryChange}
              />
              &nbsp;
            </label>
          ))}
        </div>
        <br />
        <button type="submit">Submit game</button>
      </form>
    </div>
  );
}