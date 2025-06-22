import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./oneMatchPage.css";
import {HeartIcon} from "./icons/HeartIcon";
import { getCharacterById, JikanCharacterData } from "../HomePage/utils/jikanCharacterData";
import { OptimizedImage } from "../../components/OptimizedImage";
import myphoto from '../../assets/images/myphoto.jpg'

export const OneMatchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<JikanCharacterData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const characterId = searchParams.get('characterId');

    useEffect(() => {
        if (characterId) {
            const loadCharacter = async () => {
                try {
                    const data = await getCharacterById(parseInt(characterId));
                    setCharacter(data);
                } catch (error) {
                    console.error('Ошибка загрузки персонажа:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            
            loadCharacter();
        } else {
            setIsLoading(false);
        }
    }, [characterId]);

    const handleStartChatting = () => {
        navigate('/messages');
    };

    const handleKeepSwiping = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="one-match-page">
                <div className="loading-spinner"></div>
                <p>Загрузка мэтча...</p>
            </div>
        );
    }

    return (
        <div className="one-match-page">
            <div className="one-match-page__images">
                <div className="one-match-page__image-container girl">
                    <OptimizedImage 
                        src={character?.image || ''} 
                        alt={character?.name || 'Character'} 
                        className="one-match-page__image"
                    />
                    <div className="one-match-page__heart left">
                        <HeartIcon/>
                    </div>
                </div>

                <div className="one-match-page__image-container boy">
                    <img src={myphoto} alt="You" className="one-match-page__image"/>
                    <div className="one-match-page__heart right">
                        <HeartIcon/>
                    </div>
                </div>
            </div>

            <h2 className="one-match-page__title">It's a match!</h2>
            <p className="one-match-page__subtitle">
                You and {character?.name || 'this character'} liked each other
            </p>

            <div className="one-match-page__buttons">
                <button 
                    className="one-match-page__button one-match-page__button--primary"
                    onClick={handleStartChatting}
                >
                    Start chatting
                </button>
                <button 
                    className="one-match-page__button one-match-page__button--secondary"
                    onClick={handleKeepSwiping}
                >
                    Keep swiping
                </button>
            </div>
        </div>
    );
};
