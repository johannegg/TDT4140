import { useState } from "react";
import "./ReportPage.css";
import { Link } from "react-router-dom";
import LoginModal from "../../Components/LoginModal/LoginModal";
import Navbar from "../../Components/Navbar/Navbar";
import SignupModal from "../../Components/SignupModal/SignupModal";
import ReportDetails from "../../Components/ReportDetails/ReportDetails";

const ReportPage = () => {

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
      <ReportDetails/>
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

export default ReportPage;
