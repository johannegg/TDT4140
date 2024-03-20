import { useEffect, useState, useCallback } from "react";
import "./ListView.css";
import "./DarkListView.css"
import { useDarkMode } from "../../Contexts/DarkModeContext";

import { GameCard } from "../GameCard/GameCard";
import WheelModal from "../WheelModal/WheelModal";

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
  title?: string;
}

const ListView = ({
  refreshKey,
  searchInput,
  categoriesToFilter,
  onUserPage,
  gameCardApiUrl,
  title,
}: ListViewProps) => {
  const { isDarkMode } = useDarkMode(); 
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameCardType[]>([]);
  const [gameTitles, setGameTitles] = useState<string[]>([]);
  const [gameIDs, setGameIDs] = useState(new Map<string, string>());
  const [wheelModal, setWheelModal] = useState(false);
  const [wheelModalButtonText, setwheelModalButtonText] = useState<string>();
  const listViewClassName = `${onUserPage ? "listViewUserPage" : "listView"} ${isDarkMode ? "dark" : ""}`;
  const wheel = onUserPage ? "haveWheel" : "haveNotWheel";
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

  useEffect(() => {
    setFilteredGames(
      gameCards.filter(
        (game) =>
          game.title.toLowerCase().includes(searchInput.toLowerCase()) &&
          (categoriesToFilter.length === 0 ||
            checkValidGame(game.categories, categoriesToFilter))
      )
    );
  }, [gameCards, searchInput, categoriesToFilter]);
  useEffect(() => {
    let idsAndTitles = new Map<string, string>();
    for (let i = 0; i < filteredGames.length; i++) {
      const game = filteredGames[i];
      const id = game.id.toString();
      const title = game.title;
      idsAndTitles.set(title, id);
    }
    setGameIDs(idsAndTitles);
    setGameTitles(filteredGames.map((game) => game.title.toString()));
  }, [filteredGames]);


  useEffect(() => {
    wheelModal ? setwheelModalButtonText("Lukk hjulet") : setwheelModalButtonText("Velg en tilfeldig lek!");
  }, [wheelModal]);

  const toggleWheelModal = () => {
    setWheelModal(!wheelModal);
  };

  return (
    <>
      <div className="topPart">
        <h3 className="listViewTitle">{title}</h3>
        <div onClick={toggleWheelModal} className="wheelModalButton" style={title === "Mine favoritter" ? {display: "initial"} : {display: "none"}}>
          {wheelModalButtonText}
        </div>
      </div>
      <div className={wheel}>
        <WheelModal
          visibility={wheelModal}
          onClose={toggleWheelModal}
          idsAndTitles={gameIDs}
          gameTitles={gameTitles}
        />
      </div>
      <div className={listViewClassName}>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {filteredGames.length === 0 && (
          <p>Ingen spill matcher det du leter etter.</p>
        )}
      </div>
    </>
  );
};

export default ListView;
