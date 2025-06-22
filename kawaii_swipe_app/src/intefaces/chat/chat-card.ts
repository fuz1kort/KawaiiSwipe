// Карточка чата
export interface ChatCard {
    // ID
    id: number;
    // Имя собеседника
    name: string;
    // Аватарка собеседника
    avatar: string;
    // Дата последнего сообщения
    date: Date;
    // Последнее сообщение
    message: string;
}