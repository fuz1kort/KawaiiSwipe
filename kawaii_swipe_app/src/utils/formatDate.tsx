import React from "react";
import { format, isToday, isYesterday } from "date-fns";

const formatDate = (date: Date): string => {
    if (isToday(date)) {
        // Если сегодня, показываем только время
        return format(date, "HH:mm");
    }

    if (isYesterday(date)) {
        // Если вчера, показываем "Вчера"
        return "Вчера";
    }

    // Для остальных случаев показываем дату в формате "dd.MM"
    return format(date, "dd.MM");
};

export const ChatDate: React.FC<{ date: Date }> = ({ date }) => {
    return <span>{formatDate(date)}</span>;
};