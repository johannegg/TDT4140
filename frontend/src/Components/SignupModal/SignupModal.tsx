import React, { useState } from "react";

import "./SignupModal.css";

const authApiUrl = "http://localhost:8080/api/auth";

interface ModalProps {
  visibility: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function SignupModal(props: ModalProps) {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
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

  const handleSignup = async () => {
    if (signupData.password !== passwordRepeat) {
      console.log(1);
      alert("Passordene er ikke like");
      return;
    }

    try {
      await requestSignup();
      login();
      handleClose();
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error);
    }
  };

  const requestSignup = async () => {
    const requestBodySignup = JSON.stringify(signupData);

    try {
      const response = await fetch(authApiUrl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBodySignup,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert(data.message);
    } catch (error) {
      console.error("Error during signup request:", error);
      throw error; // Re-throw the error to be caught by the handleSignup function
    }
  };

  const login = () => {
    const requestBody = JSON.stringify({
      username: signupData.username,
      password: signupData.password,
    });

    // Fetch the token and roles upon successful login
    fetch(authApiUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then(response => response.json().then(data => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(localStorage.getItem("userInfo"));
        const info = localStorage.getItem("userInfo");
        if (info != null) {
          console.log(JSON.parse(info).roles);
        }
        window.location.reload();
      }))
      .catch((error) => {
        console.error("Error logging in:", error);
        alert(error);
      });
  };

  return (
    <>
      {props.visibility && (
        <div className="modal">
          <div className="loginOverlay"></div>
          <div className="modalContent">
            <div className="modalHeader">
              <p>Lag bruker</p>
              <div onClick={handleClose} className="close" />
            </div>
            <div className="modalBody">
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                value={signupData.username}
                placeholder="Brukernavn"
              />
              <br />
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={signupData.email}
                placeholder="Email"
              />
              <br />
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={signupData.password}
                placeholder="Passord"
              />
              <br />
              <input
                type="password"
                name="passwordRepeat"
                onChange={(e) => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
                placeholder="Gjenta passord"
              />
              <br />
            </div>
            <div className="modalFooter">
              <button
                style={{ padding: "7px", margin: "8px" }}
                onClick={handleSignup}
              >
                Lag bruker
              </button>
              <p onClick={props.onLogin} className="loginButton">
                Har du allerede en konto? Logg inn
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
