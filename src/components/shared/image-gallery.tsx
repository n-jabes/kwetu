import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl group">
      {/* Main image container */}
      <div className="relative w-full h-full">
        
        <Image
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          onError={() => {
            console.error('Image failed to load:', images[currentIndex]);
          }}
          placeholder="empty"
        />
      </div>

      {/* Navigation arrows - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white/100 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute cursor-pointer right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white/100 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageGallery;