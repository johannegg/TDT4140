import { useState } from "react";
import "./UserPage.css";
import { Link } from "react-router-dom";
import LoginModal from "../../Components/LoginModal/LoginModal";
import UserDetails from "../../Components/UserDetails/UserDetails";
import Navbar from "../../Components/Navbar/Navbar";
import SignupModal from "../../Components/SignupModal/SignupModal";

const UserPage = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
  };
  const toggleSignupModal = () => {
    setSignupModal(!signupModal);
  };

  return (
    <>
      <Link to={"/"}>
        <button className="backButton">Tilbake</button>
      </Link>
      <Navbar toggleLoginModal={toggleLoginModal}></Navbar>
      <UserDetails></UserDetails>
      <LoginModal
        visibility={loginModal}
        onClose={toggleLoginModal}
        onSignup={() => {
          toggleLoginModal();
          toggleSignupModal();
        }}
      ></LoginModal>
      <SignupModal
        visibility={signupModal}
        onClose={toggleSignupModal}
        onLogin={() => {
          toggleLoginModal();
          toggleSignupModal();
        }}
      ></SignupModal>
    </>
  );
};

export default UserPage;
