import React, { useState } from "react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ListView from "../../Components/ListView/ListView";
import LoginModal from "../../Components/LoginModal/LoginModal";
import SignupModal from "../../Components/SignupModal/SignupModal";

export default function HomePage() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleLoginModal = () => {
    // localStorage.clear();
    setLoginModal(!loginModal);
  };
  const toggleSignupModal = () => {
    setSignupModal(!signupModal);
  };

  return (
    <>
      <Navbar toggleLoginModal={toggleLoginModal}></Navbar>
      <Sidebar></Sidebar>
      <ListView></ListView>
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
}
