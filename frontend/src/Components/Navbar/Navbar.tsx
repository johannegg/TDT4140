import "./Navbar.css";

import logoImage from "./icon/Icebreaker-4.png";
import loginn from "./icon/loginn.png";
import logout from "./icon/logout.png";
import { Link } from "react-router-dom";
interface NavbarProps {
  toggleLoginModal: () => void;
}
const handleLogout = () => {
  if (window.confirm("Er du sikker på at du vil logge ut?")) {
    localStorage.clear();
    window.location.href = "/";
  }
};
const Navbar = (props: NavbarProps) => {
  return (
    <div className="header">
      <div>
        {/* <img
          src={navbarIcon}
          height="70"
          width="45"
          alt="Navbar Icon"
          style={{ marginTop: "8px", marginLeft: "32px" }}
        /> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={"/"}>
          <img src={logoImage} height="100" width="400" alt="Logo" />
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {localStorage.getItem("userInfo") == null && (
          <img
            className="logImg"
            onClick={props.toggleLoginModal}
            src={loginn}
            height="60"
            alt="Logo"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
        {localStorage.getItem("userInfo") !== null && (
          <img
            className="logImg"
            onClick={handleLogout}
            src={logout}
            height="60"
            alt="Logo"
            style={{ marginTop: "16px", cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
