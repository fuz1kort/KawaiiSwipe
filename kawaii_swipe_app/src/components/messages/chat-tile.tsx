import React from 'react';
import { ChatCard } from "../../intefaces/chat/chat-card";

const ChatTile = (props: { chat: ChatCard }) => {
    const { chat } = props;

    return (
        <div className="chat-card__layout">
            <div className="chat-card__info" style={{ flexDirection: "row"}}>
                <div className="chat-card__avatar">
                    <img src={chat.avatar} alt="avatar" />
                </div>
                <div className="chat-card__info">
                    <div className="chat-card__info-name">{ chat.name }</div>
                    <div className="chat-card__info-message">{ chat.message }</div>
                </div>
            </div>
            <div className="chat-card__message-info">
                <span>{chat.date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</span>
            </div>
        </div>
    );
};

export default ChatTile;