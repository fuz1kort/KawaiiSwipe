import React, {useEffect, useState} from "react";
import "./index.css";
import {LikeIcon} from "./icons/LikeIcon";
import {DislikeIcon} from "./icons/DislikeIcon";
import {getCharacterById, JikanCharacterData} from "../HomePage/utils/jikanCharacterData";
import {loadData} from "../../utils/loadData";

export const MatchesPage: React.FC = () => {
    const savedMatches = JSON.parse(localStorage.getItem("matches") || "[]");
    const [matches, setMatches] = useState<JikanCharacterData[]>([]); // Используем тип JikanCharacterData
    const [loading, setLoading] = useState<boolean>(true); // Добавляем состояние загрузки
    const [error, setError] = useState<string | null>(null); // Добавляем состояние ошибки

    const handleDislike = (id: number) => {
        setMatches((prev) => prev.filter((match) => match.id !== id));
        removeMatch(id);
    };

    const removeMatch = (characterId: number) => {
        // Загружаем данные из localStorage
        const savedMatches = JSON.parse(localStorage.getItem("matches") || "[]");

        // Фильтруем массив, удаляя объект с указанным characterId
        const updatedMatches = savedMatches.filter(
            (match: { id: number }) => match.id !== characterId
        );

        // Сохраняем обновленный массив обратно в localStorage
        localStorage.setItem("matches", JSON.stringify(updatedMatches));
    };

    useEffect(() => {
        const fetchData = async () => {
            const characters = await loadData(savedMatches.map((match: {
                id: number
            }) => match.id), getCharacterById, setLoading, setError);
            if (characters) {
                setMatches(characters);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="page">Loading...</div>;
    }

    if (error) {
        return <div className="page">{error}</div>;
    }

    return (
        <div className="page">
            <h1 className="matches-title">Matches</h1>
            <p>This is a list of people who have liked you and your matches.</p>
            <div className="matches-list">
                {matches.map(({id, name, title, image}) => (
                    <div key={id} className="match-card">
                        <img src={image} alt={`${name} фото`} className="photo"/>
                        <div className="info">{`${name}, ${title}`}</div>

                        <div className="action-overlay">
                            <button
                                className="action-button cross"
                                aria-label="Reject"
                                onClick={() => handleDislike(id)}
                            >
                                <DislikeIcon/>
                            </button>

                            <div className="action-divider"/>

                            <button className="action-button heart" aria-label="Like">
                                <LikeIcon/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
