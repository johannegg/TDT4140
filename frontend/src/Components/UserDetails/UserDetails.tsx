import "./UserDetails.css";
import ListView from "../ListView/ListView";

const favoriteGamesRefreshKey = 1;
// const queuedGamesRefreshKey = 2;

const UserPage = () => {

  // Replace these with dynamic data
  const username = "Bruker";
  const email = "brukernavn@gmail.com";
  // const minHeight = `${window.innerHeight * 0.9 - window.innerHeight * 0.01 - 10}px`;

  return (
    <div
      className="user-page-container"
      // style={{ minHeight }}
      >
      <div className="userinfo-title">
        <h2>Min Profil</h2>
        <p>Brukernavn: {username}</p>
        <p>Email: {email}</p>
      </div>
      {/* Replace with dynamic username */}
      <div className="lists-container">
        <div className="list-view">
          <h3 className="favorites">Favoritter</h3>
          <ListView 
          categoriesToFilter={[]}
          searchInput=""
          refreshKey={favoriteGamesRefreshKey}
          isUserPage={true} 
          gameCardApiUrl="http://localhost:8080/api/gamecard" 

          />
        </div>
        {/* <div className="list-view">
          <h3 className="queue">Kø</h3>
          <ListView refreshKey={queuedGamesRefreshKey} isUserPage={true} gameCardApiUrl="http://localhost:8080/api/gamecard" />
        </div> */}
      </div>
    </div>
  );
};

export default UserPage;
