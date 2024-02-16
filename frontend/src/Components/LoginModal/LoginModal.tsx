import React, { useState } from "react";

import "./LoginModal.css";

const authApiUrl = "http://localhost:8080/api/auth";

interface ModalProps {
  visibility: boolean;
  onClose: () => void;
  onSignup: () => void;
}

export default function LoginModal(props: ModalProps) {
  const [loginData, setSignupData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleSignup = () => {
    props.onSignup();
  };

  const handleLogin = () => {
    const requestBody = JSON.stringify(loginData);

    // Fetch the token and roles upon successful login
    fetch(authApiUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(localStorage.getItem("userInfo"));
        const info = localStorage.getItem("userInfo");
        if (info != null) {
          console.log(JSON.parse(info).roles);
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <>
      {props.visibility && (
        <div className="modal">
          <div className="loginOverlay"></div>
          <div className="modalContent">
            <div className="modalHeader">
              <p>Login</p>
              <div onClick={handleClose} className="close" />
            </div>
            <div className="modalBody">
              <input
                type="text"
                onChange={handleInputChange}
                name="username"
                value={loginData.username}
                placeholder="Username"
              />
              <br />
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={loginData.password}
                placeholder="Password"
              />
              <br />
            </div>
            <div className="modalFooter">
              <button
                style={{ padding: "7px", margin: "8px" }}
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="signupButton" onClick={handleSignup}>
                Don't have an account? Sign up
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
