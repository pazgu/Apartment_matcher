import { useState } from "react";
import "./ImagesCarousel.css";

const ImagesCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-content">
          <img
            src={images[currentIndex].image_url}
            alt={`Slide ${currentIndex}`}
          />
        </div>
        <button className="left-arrow" onClick={goToPrevious}>
          &gt;
        </button>
        <button className="right-arrow" onClick={goToNext}>
          &lt;
        </button>
      </div>
    </div>
  );
};

export default ImagesCarousel;
