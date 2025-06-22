import { ChatCard } from "../../intefaces/chat/chat-card";
import ChatTile from "../../components/messages/chat-tile";

export const MessagesPage = () => {
    const chats: ChatCard[] = [
        {
            id: 1,
            name: "Name",
            avatar: "https://avatars.githubusercontent.com/u/113981832?v=4",
            date: new Date(),
            message: "Hello World!"
        },
        {
            id: 2,
            name: "Name",
            avatar: "https://avatars.githubusercontent.com/u/113981832?v=4",
            date: new Date(),
            message: "Hello World!"
        },
        {
            id: 3,
            name: "Name",
            avatar: "https://avatars.githubusercontent.com/u/113981832?v=4",
            date: new Date(),
            message: "Hello World!"
        },
        {
            id: 4,
            name: "Name",
            avatar: "https://avatars.githubusercontent.com/u/113981832?v=4",
            date: new Date(),
            message: "Hello World!"
        }
    ];

    return (
        <div className="page">
            <h1 style={{ padding: 10 }}>Messages</h1>

            {chats.map((chat: ChatCard) => (
                <ChatTile key={chat.id} chat={chat} />
            ))}
        </div>
    );
};
