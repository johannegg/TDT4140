import "./UserDetails.css";
import ListView from "../ListView/ListView";
import RatingListView from "../RatingListView/RatingListView";

const favoriteGamesRefreshKey = 1;
const queuedGamesRefreshKey = 2;

const UserPage = () => {

  const userInfoString = localStorage.getItem("userInfo");
  if (!userInfoString) {
    alert("Logg inn for å se denne siden");
    window.location.href = "/";
    return null;
  }

  const userInfo = JSON.parse(userInfoString);
  const username: string = userInfo.username;
  const email: string = userInfo.email;
  const favoritesEndpoint: string = "http://localhost:8080/api/favorites/get/all/" + username;
  const queueEndpoint: string = "http://localhost:8080/api/queue/get/all/" + username;
  const ratingEndpoint: string = "http://localhost:8080/api/rating/get/user/" + username;


  return (
    <div className="user-page-container">
      <div className="userinfo-title">
        <h2>Min profil</h2>
        <p>Brukernavn: {username}</p>
        <p>E-postadresse: {email}</p>
      </div>
      <div className="lists-container">
        <div className="list-view">
          <ListView 
          title="Mine favoritter"
          categoriesToFilter={[]}
          searchInput=""
          refreshKey={favoriteGamesRefreshKey}
          onUserPage={true} 
          gameCardApiUrl={favoritesEndpoint} />
        </div>
        <div className="list-view">
          <ListView 
          title="Min kø"
          categoriesToFilter={[]}
          searchInput=""
          refreshKey={queuedGamesRefreshKey}
          onUserPage={true} 
          gameCardApiUrl={queueEndpoint} />
        </div>
        <div className="list-view">
          <h3 className="ratings">Mine Ratings</h3>
          <RatingListView 
          ratingApiUrl={ratingEndpoint}
          onUserPage={true}/>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
