import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const LoginPage = () => {
    const [nickname, setNickname] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (nickname && avatarUrl) {
            localStorage.removeItem("user");
            localStorage.removeItem("matches");

            // Сохраняем данные пользователя в localStorage
            localStorage.setItem(
                "user",
                JSON.stringify({ nickname, avatar: avatarUrl })
            );

            // Перенаправляем на главную страницу
            navigate("/");
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Вход</h1>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label htmlFor="nickname">Никнейм:</label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Введите никнейм"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="avatarUrl">URL аватара:</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="Введите URL аватара"
                        />
                    </div>
                    <button type="button" onClick={handleLogin} className="login-button">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};