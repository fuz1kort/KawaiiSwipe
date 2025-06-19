import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';
import photo1 from './src/onboarding1.jpg'
import photo2 from './src/onboarding2.jpg'
import photo3 from './src/onboarding3.jpg'


const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: photo1,
      title: 'Алгоритм',
      description:
        'Пользователи проходят модерацию, чтобы вы никогда не общались с ботами.',
    },
    {
      image: photo2,
      title: 'Совпадения',
      description:
        'Мы подбираем вам людей с широким кругом общих интересов.',
    },
    {
      image: photo3,
      title: 'Премиум',
      description:
        'Зарегистрируйтесь сегодня и получите первый месяц премиум-подписки бесплатно.',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="image-slider">
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
      </div>
      <div className="content">
        <h2 className="title">{slides[currentSlide].title}</h2>
        <p className="description">{slides[currentSlide].description}</p>
      </div>
      <div className="controls">
        <button onClick={handlePrev} disabled={currentSlide === 0}>
          Previous
        </button>
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
        <button onClick={handleNext} disabled={currentSlide === slides.length - 1}>
          Next
        </button>
      </div>
      <div className="actions">
        <button className="create-account" onClick={() => navigate('/register')}>
          Создать аккаунт
        </button>
        <p>
          Уже есть аккаунт?{' '}
          <a href="/login" className="sign-in">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;