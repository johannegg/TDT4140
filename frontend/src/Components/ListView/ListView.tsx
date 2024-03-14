import { useEffect, useState, useCallback } from "react";
import "./ListView.css";
import { GameCard } from "../GameCard/GameCard";
import ReportForm from "../ReportForm/ReportForm";

type GameCardType = {
  id: string;
  title: string;
  categories: string[];
  description: string;
  rating?: number;
};

interface ListViewProps {
  categoriesToFilter: Array<string>;
  searchInput: string;
  refreshKey: number;
  onUserPage?: boolean;
  gameCardApiUrl: string;
}

const ListView = ({
  refreshKey,
  searchInput,
  categoriesToFilter,
  onUserPage,
  gameCardApiUrl,
}: ListViewProps) => {
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);
  const listViewClassName = onUserPage ? "listViewUserPage" : "listView";
  const fetchGameCards = useCallback(() => {
    let headers = undefined;
    if (onUserPage) {
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        return;
      }
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.accessToken;
      headers = { Authorization: `Bearer ${token}` };
    }
    fetch(`${gameCardApiUrl}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) =>
        response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.message);
          }
          setGameCards(data);
        })
      )
      .catch((error) => {
        console.error("Error fetching game cards:", error);
        alert(error);
      });
  }, [gameCardApiUrl, onUserPage]);

  useEffect(() => {
    fetchGameCards();
  }, [fetchGameCards, refreshKey]);

  const checkValidGame = (arr: Array<string>, target: Array<string>) =>
    target.every((category) => arr.includes(category));

  const filteredGames = gameCards.filter(
    (game) =>
      game.title.toLowerCase().includes(searchInput.toLowerCase()) &&
      (categoriesToFilter.length === 0 ||
        checkValidGame(game.categories, categoriesToFilter))
  );

  return (
    <>
      <div className={listViewClassName}>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
        {filteredGames.length === 0 && (
          <p>Ingen spill matcher det du leter etter.</p>
        )}
      </div>
    </>
  );
};

export default ListView;
