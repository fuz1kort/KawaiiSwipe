import {ChatCard} from "../../interfaces/chat/chat-card";
import ChatTile from "../../components/messages/chat-tile";
import {getCharacterById, JikanCharacterData} from "../HomePage/utils/jikanCharacterData";
import React, {useEffect, useState} from "react";
import {loadData} from "../../utils/loadData";

export const MessagesPage = () => {
    const savedMatches = JSON.parse(localStorage.getItem("matches") || "[]");
    const [matches, setMatches] = useState<JikanCharacterData[]>([]); // Используем тип JikanCharacterData
    const [loading, setLoading] = useState<boolean>(true); // Добавляем состояние загрузки
    const [error, setError] = useState<string | null>(null); // Добавляем состояние ошибки

    const getMatchDataFromLocalStorage = (id: number) => {
        return savedMatches.find((match: { id: number }) => match.id === id);
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

    // Генерация чатов на основе данных из localStorage и matches
    const chats = matches
        .map((match) => {
            // Ищем данные в localStorage
            const matchData = getMatchDataFromLocalStorage(match.id);

            // Возвращаем объект ChatCard
            return {
                id: match.id,
                name: match.name,
                avatar: match.image,
                date: matchData?.date ? new Date(matchData.date) : new Date(), // Если дата есть в localStorage, используем её
                message: matchData?.message || "Привет! Как дела?", // Если сообщение есть в localStorage, используем его
            };
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime()); // Сортировка от новых к старым

    if (loading) {
        return <div className="page">Loading...</div>;
    }

    if (error) {
        return <div className="page">{error}</div>;
    }

    return (
        <div className="page">
            <h1 style={{padding: 10}}>Messages</h1>

            {chats.map((chat: ChatCard) => (
                <ChatTile key={chat.id} chat={chat}/>
            ))}
        </div>
    );
};
