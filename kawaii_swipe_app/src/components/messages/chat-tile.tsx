import React from 'react';
import {ChatCard} from "../../interfaces/chat/chat-card";
import {ChatDate} from "../../utils/formatDate";

const ChatTile = (props: { chat: ChatCard }) => {
    const {chat} = props;

    return (
        <div className="chat-card__layout">
            <div className="chat-card__info" style={{flexDirection: "row"}}>
                <div className="chat-card__avatar">
                    <img src={chat.avatar} alt="avatar"/>
                </div>
                <div className="chat-card__info">
                    <div className="chat-card__info-name">{chat.name}</div>
                    <div className="chat-card__info-message">{chat.message}</div>
                </div>
            </div>
            <div className="chat-card__message-info">
                <ChatDate date={chat.date}/>
            </div>
        </div>
    );
};

export default ChatTile;