import React, { useState, useEffect, useCallback } from 'react';
import { useSprings, animated as a, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './homepage.css';
import { getCharacterById, JikanCharacterData } from './utils/jinkanCharacter';
import { ReturnBackIcon } from './icons/ReturnBackIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { DiscardIcon } from './icons/DiscardIcon';
import { LikeIcon } from './icons/LikeIcon';
import { FavoritesIcon } from './icons/FavoritesIcon';
import { OptimizedImage } from '../../components/OptimizedImage';
import { imageCache } from '../../utils/imageCache';
import { useNavigate } from 'react-router-dom';

interface SpringProps {
    x: number;
    rot: number;
    scale: number;
    opacity: number;
}

interface DragState {
    args?: [number];
    down: boolean;
    movement: [number, number];
    direction: [number, number];
    velocity: number;
}

export const HomePage = () => {
    const [gone] = useState<Set<number>>(() => new Set());
    const [cards, setCards] = useState<number[]>([]);
    const [character, setCharacter] = useState<JikanCharacterData | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAutoLoading, setIsAutoLoading] = useState(false);
    const navigate = useNavigate();

    const [props, api] = useSprings<SpringProps>(cards.length, () => ({
        x: 0,
        rot: 0,
        scale: 1,
        opacity: 1,
        config: { tension: 500, friction: 30 },
    }));

    const getRandomId = useCallback((min = 1, max = 30000): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, []);

    const preloadCharacterImages = useCallback(
        async (count: number = 3) => {
            const imageUrls: string[] = [];

            for (let i = 0; i < count; i++) {
                try {
                    const randomId = getRandomId();
                    const character = await getCharacterById(randomId);
                    if (character.image) {
                        imageUrls.push(character.image);
                    }
                } catch (error) {
                    console.error('Ошибка предзагрузки персонажа:', error);
                }
            }

            if (imageUrls.length > 0) {
                await imageCache.preloadImages(imageUrls);
            }
        },
        [getRandomId]
    );

    const checkForMatch = (): boolean => {
        return Math.random() <= 0.4;
    };

    const handleMatch = () => {
        if (checkForMatch()) {
            navigate('/matches');
        }
    };

    const loadNextCharacter = useCallback(async () => {
        if (isLoading || isAutoLoading) return;

        setIsLoading(true);
        const randomId = getRandomId();

        try {
            const data = await getCharacterById(randomId);
            setCharacter(data);
            setCards([randomId]);

            preloadCharacterImages(2);
        } catch (error) {
            console.error('Ошибка загрузки персонажа:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isAutoLoading, getRandomId, preloadCharacterImages]);

    const handleSwipeLeft = () => {
        const currentIndex = cards[0];
        if (currentIndex !== undefined) {
            api.start(i => {
                if (i !== currentIndex) return;
                return {
                    x: -(200 + window.innerWidth),
                    rot: -10,
                    scale: 1,
                    opacity: 0,
                    immediate: false,
                    config: { friction: 30, tension: 400 },
                };
            });

            setTimeout(() => {
                setCards(prev => prev.filter(cardIndex => cardIndex !== currentIndex));
            }, 400);
        }
    };

    const handleSwipeRight = () => {
        const currentIndex = cards[0];
        if (currentIndex !== undefined) {
            api.start(i => {
                if (i !== currentIndex) return;
                return {
                    x: 200 + window.innerWidth,
                    rot: 10,
                    scale: 1,
                    opacity: 0,
                    immediate: false,
                    config: { friction: 30, tension: 400 },
                };
            });

            setTimeout(() => {
                setCards(prev => prev.filter(cardIndex => cardIndex !== currentIndex));
                handleMatch();
            }, 400);
        }
    };

    const bind = useDrag(({ args, down, movement: [mx], direction: [xDir] }: DragState) => {
        const index = args?.[0] ?? 0;
        const dir = xDir < 0 ? -1 : 1;

        if (!down && Math.abs(mx) > 10) {
            gone.add(index);
            setTimeout(() => {
                setCards(prev => prev.filter(cardIndex => cardIndex !== index));
                if (dir > 0) handleMatch();
            }, 150);
        }

        api.start(i => {
            if (index !== i) return;
            const isGone = gone.has(index);
            const x = isGone ? (200 + window.innerWidth) * dir : mx;
            const rot = down ? mx / 100 : 0;
            const scale = down ? 1.1 : 1;
            const opacity = isGone ? 0 : down ? Math.max(0, 1 - Math.abs(mx) / 100) : 1;

            return {
                x,
                rot,
                scale,
                opacity,
                delay: undefined,
                config: {
                    friction: 30,
                    tension: down ? 800 : isGone ? 400 : 500,
                },
            };
        });
    }) as ReturnType<typeof useDrag>;

    useEffect(() => {
        if (!isInitialized) {
            setIsInitialized(true);
            loadNextCharacter();
            preloadCharacterImages(5);
        }
    }, [isInitialized, loadNextCharacter, preloadCharacterImages]);

    useEffect(() => {
        if (cards.length === 0 && isInitialized && !isLoading && !isAutoLoading) {
            setIsAutoLoading(true);
            setTimeout(() => {
                loadNextCharacter();
                setIsAutoLoading(false);
            }, 200);
        }
    }, [cards.length, isInitialized, isLoading, isAutoLoading, loadNextCharacter]);

    return (
        <div className="home-page-container">
            <div className="top-bar">
                <button className="top-btn back">
                    <ReturnBackIcon />
                </button>
                <h2>Discover</h2>
                <button className="top-btn filter">
                    <SettingsIcon />
                </button>
            </div>
            <div className="card-container">
                {isLoading && cards.length === 0 ? (
                    <div className="card loading-card">
                        <div className="loading-spinner"></div>
                        <p>Загрузка персонажа...</p>
                    </div>
                ) : (
                    cards.map((cardIndex, i) => (
                        <a.div
                            key={cardIndex}
                            className="card"
                            {...bind(cardIndex)}
                            style={{
                                transform: interpolate(
                                    [props[i].x, props[i].rot, props[i].scale],
                                    (xVal, rotVal, scaleVal) =>
                                        `translate(-50%, -50%) translateX(${xVal}px) rotate(${rotVal}deg) scale(${scaleVal})`
                                ),
                                opacity: props[i].opacity,
                            }}
                        >
                            <OptimizedImage
                                src={character?.image || ''}
                                alt={character?.name || 'Character'}
                                className="card-image"
                            />
                            <div className="card-info">
                                <h2>{character?.name}</h2>
                                <p>{character?.title}</p>
                            </div>
                        </a.div>
                    ))
                )}
            </div>
            <div className="card-buttons">
                <button onClick={handleSwipeLeft} disabled={isLoading}>
                    <DiscardIcon />
                </button>
                <button onClick={handleSwipeRight} disabled={isLoading}>
                    <LikeIcon />
                </button>
                <button disabled={isLoading}>
                    <FavoritesIcon />
                </button>
            </div>
        </div>
    );
};
