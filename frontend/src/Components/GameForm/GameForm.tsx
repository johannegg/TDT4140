import React, { useState } from "react";
import "./GameForm.css";

const gameCardApiUrl = "http://localhost:8080/api/gamecard";

interface ModalProps {
  visibility: boolean;
  onClose: () => void;
  refreshListView: () => void;
}
interface FormData {
  title: string;
  description: string;
  rules: string;
  categories: string[];
}

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "0", name: "Familie:" },
  { id: "1", name: "Fest:" },
  { id: "2", name: "Barn:" },
  { id: "3", name: "Innendørs:" },
  { id: "4", name: "Utendørs:" },
  { id: "5", name: "Quiz:" },
  { id: "6", name: "Musikk quiz:" },
  { id: "7", name: "Student:" },
  { id: "8", name: "Individuell:" },
  { id: "9", name: "Team building:" },
];

export function GameForm({ visibility, onClose, refreshListView }: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    rules: "",
    categories: [] as string[],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    setFormData((prevFormData) => {
      const isAlreadySelected = prevFormData.categories.includes(categoryId);
      const updatedCategories = isAlreadySelected
        ? prevFormData.categories.filter((id) => id !== categoryId)
        : [...prevFormData.categories, categoryId];

      return { ...prevFormData, categories: updatedCategories };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      alert("Logg inn for å legge til en lek");
      return;
    }

    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;

    if (!token) {
      alert("Logg inn for å legge til en lek");
      return;
    }

    const requestBodySubmit = JSON.stringify({
      ...formData,
      username: userInfo.username,
    });

    try {
      const response = await fetch(`${gameCardApiUrl}/create`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: requestBodySubmit,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      console.log(data);
      alert("Leken ble lagt til!");
      refreshListView();
      onClose();
    } catch (error) {
      console.error("Error during form submission:", error);
      alert(error);
    }
  };

  if (!visibility) return null;

  return (
    <div className="game-form-container">
      <div onClick={handleClose} className="close"></div>
      <form onSubmit={handleSubmit}>
        <h2>Legg til et nytt spill</h2>
        <label>
          Navnet på leken:
          <input
            name="title"
            className="input"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        {/* Description Input */}
        <label>
          Kort beskrivelse av leken:
          <input
            name="description"
            className="input"
            type="text"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        {/* Rules Input */}
        <label>
          Lekens regler:
          <textarea
            name="rules"
            className="description"
            required
            rows={4}
            value={formData.rules}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <div className="checkboxContainer">
          {categories.map((category) => (
            <label key={category.id}>
              {category.name}
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                checked={formData.categories.includes(category.id)}
                onChange={handleCategoryChange}
              />
            </label>
          ))}
        </div>
        <br />
        <button type="submit" className="submitButton">Lag lek</button>
      </form>
    </div>
  );
}
