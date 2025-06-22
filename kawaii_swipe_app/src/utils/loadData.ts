import {JikanCharacterData} from "../pages/HomePage/utils/jikanCharacterData";

export const loadData = async (
    ids: number[],
    fetchFunction: (id: number) => Promise<JikanCharacterData>,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
): Promise<JikanCharacterData[] | null> => {
    try {
        setLoading(true);
        const promises = ids.map((id) => fetchFunction(id)); // Создаем массив промисов
         // Выполняем все запросы параллельно
        return await Promise.all(promises);
    } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        return null;
    } finally {
        setLoading(false);
    }
};