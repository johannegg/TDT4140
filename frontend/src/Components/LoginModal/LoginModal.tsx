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
                            <p>Logg inn</p>
                            <div onClick={handleClose} className="close" />
                        </div>
                        <div className="modalBody">
                            <input
                                type="text"
                                onChange={handleInputChange}
                                name="username"
                                value={loginData.username}
                                placeholder="Brukernavn"
                            />
                            <br />
                            <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                                value={loginData.password}
                                placeholder="Passord"
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
                                Har du ikke en konto? Lag en her!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
