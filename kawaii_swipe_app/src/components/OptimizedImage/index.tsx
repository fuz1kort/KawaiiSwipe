import React, { useState, useEffect, useRef } from 'react';
import { imageCache } from '../../utils/imageCache';
import './index.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setImageLoaded(false);
      setCurrentSrc('');
      return;
    }

    if (currentSrc !== src) {
      setIsLoading(true);
      setImageLoaded(false);
      setCurrentSrc(src);
    }

    if (imageCache.hasImage(src)) {
      setIsLoading(false);
      setImageLoaded(true);
      onLoad?.();
      return;
    }

    imageCache.cacheImage(src)
      .then(() => {
        if (currentSrc === src) {
          setIsLoading(false);
          setImageLoaded(true);
          onLoad?.();
        }
      })
      .catch(() => {
        if (currentSrc === src) {
          setIsLoading(false);
          setImageLoaded(false);
          onError?.();
        }
      });
  }, [src, onLoad, onError, currentSrc]);

  return (
    <div className={`optimized-image-container ${className}`}>
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {imageLoaded && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`optimized-image ${imageLoaded ? 'image-loaded' : ''}`}
          draggable={false}
        />
      )}
    </div>
  );
}; 