import React, { useState } from "react";
import "./index.css";
import { LikeIcon } from "./icons/LikeIcon";
import { DislikeIcon } from "./icons/DislikeIcon";

export const MatchesPage: React.FC = () => {
  const initialMatches = [
    {
      id: 1,
      name: "Сакура",
      age: 19,
      photoUrl:
        "https://imba.shop/image/cache/catalog/blog_custom/anime.%20waifu/yor-0x0.webp",
    },
    {
      id: 2,
      name: "Рин",
      age: 20,
      photoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4jqvt2tnayKjk4gWYREXj826nqfsUMsMPQ&s",
    },
    {
      id: 3,
      name: "Юки",
      age: 18,
      photoUrl: "https://www.goha.ru/s/A:Mc/1G/4cPa2fuMkj.jpg",
    },
    {
      id: 4,
      name: "Маю",
      age: 21,
      photoUrl:
        "https://rdd.media/wp-content/uploads/2021/08/mai-sakurajima.jpg",
    },
    {
      id: 5,
      name: "Асуна",
      age: 19,
      photoUrl:
        "https://a-g.site/upload/000/u2/6/4/vaifu-japonskie-anime-terminy-picture-big.jpg",
    },
  ];

  const [matches, setMatches] = useState(initialMatches);

  const handleDislike = (id: number) => {
    setMatches((prev) => prev.filter((match) => match.id !== id));
  };

  return (
    <div className="page">
      <h1 className="matches-title">Matches</h1>
      <p>This is a list of people who have liked you and your matches.</p>
      <div className="matches-list">
        {matches.map(({ id, name, age, photoUrl }) => (
          <div key={id} className="match-card">
            <img src={photoUrl} alt={`${name} фото`} className="photo" />
            <div className="info">{`${name}, ${age} лет`}</div>

            <div className="action-overlay">
              <button
                className="action-button cross"
                aria-label="Reject"
                onClick={() => handleDislike(id)}
              >
                <DislikeIcon />
              </button>

              <div className="action-divider" />

              <button className="action-button heart" aria-label="Like">
                <LikeIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
