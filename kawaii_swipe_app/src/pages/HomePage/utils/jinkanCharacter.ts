const BASE_URL = "https://api.jikan.moe/v4";

export interface JikanCharacterData {
    name: string;
    image: string;
    title: string;
}

export async function getCharacterById(id: number): Promise<JikanCharacterData> {
    const response = await fetch(`${BASE_URL}/characters/${id}/full`);
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

    const { data } = await response.json();
    const image = data.images?.jpg?.image_url || "";
    let title = "";

    if (Array.isArray(data.anime) && data.anime.length > 0) {
        title = data.anime[0].anime.title;
    } else if (Array.isArray(data.manga) && data.manga.length > 0) {
        title = data.manga[0].manga.title;
    }

    return {
        name: data.name,
        image,
        title
    };
}
