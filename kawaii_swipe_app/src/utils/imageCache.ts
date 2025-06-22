class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private maxSize = 50;

  async cacheImage(src: string): Promise<HTMLImageElement> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.addToCache(src, img);
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  hasImage(src: string): boolean {
    return this.cache.has(src);
  }

  private addToCache(src: string, img: HTMLImageElement) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(src, img);
  }

  async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.cacheImage(url).catch(() => null));
    await Promise.allSettled(promises);
  }
}

export const imageCache = new ImageCache();

