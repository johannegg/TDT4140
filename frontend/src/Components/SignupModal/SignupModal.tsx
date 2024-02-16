import React, { useState } from "react";

import "./SignupModal.css";
import { log } from "console";

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
    if (signupData.password != passwordRepeat) {
      console.log(1);
      alert("Passwords do not match");
      return;
    }

    try {
      await requestSignup();
      login();
      handleClose();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
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

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error("Something went wrong");
      }
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
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <>
      {props.visibility && (
        <div className="modal">
          <div className="loginOverlay"></div>
          <div className="modalContent">
            <div className="modalHeader">
              <p>Sign up</p>
              <div onClick={handleClose} className="close" />
            </div>
            <div className="modalBody">
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                value={signupData.username}
                placeholder="Username"
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
                placeholder="Password"
              />
              <br />
              <input
                type="password"
                name="passwordRepeat"
                onChange={(e) => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
                placeholder="Repeat password"
              />
              <br />
            </div>
            <div className="modalFooter">
              <button
                style={{ padding: "7px", margin: "8px" }}
                onClick={handleSignup}
              >
                Sign up
              </button>
              <p onClick={props.onLogin} className="loginButton">
                Already have an account? Login
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
