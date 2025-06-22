import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./profile.css";
import {getCharacterById, JikanCharacterData} from "../HomePage/utils/jikanCharacterData";

export const ProfilePage = () => {
    const {id} = useParams();
    const [profileData, setProfileData] = useState<JikanCharacterData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                // Если есть id, загружаем данные персонажа
                const character = await getCharacterById(parseInt(id));
                setProfileData(character);
            } else {
                // Если id нет, загружаем данные текущего пользователя из localStorage
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    const userData = JSON.parse(savedUser);
                    const userProfile: JikanCharacterData = {
                        id: -1,
                        name: userData.nickname,
                        image: userData.avatar,
                        title: "Anime lover",
                    };
                    setProfileData(userProfile);
                }
            }
        };

        loadData();
    }, [id]);

    // Если данные еще не загружены, показываем загрузку
    if (!profileData) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={profileData.image || "../../assets/images/defaultPhoto.jpg"}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{profileData.name}</h1>
                    <p className="profile-title">{profileData.title}</p>
                </div>
            </div>

            <div className="profile-content">
                <div className="about-section">
                    <h2 className="section-title">About</h2>
                    <p className="about-text">
                        My name is {profileData.name}, and I enjoy meeting new anime waifus and finding ways to help
                        them have an
                        uplifting experience.
                    </p>
                </div>
            </div>
        </div>
    );
};