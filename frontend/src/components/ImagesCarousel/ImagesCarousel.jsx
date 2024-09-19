import { useState } from "react";
import "./ImagesCarousel.css";
import { APARTMENT_PLACEHOLDER_IMAGE_URL } from "../../constants";

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

  const handleError = (e) => {
    e.target.src = APARTMENT_PLACEHOLDER_IMAGE_URL;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-content">
          <img
            src={images[currentIndex].image_url}
            alt={`Slide ${currentIndex}`}
            onError={handleError}
          />
        </div>
        <button
          className={`carousel-left-arrow ${images.length <= 1 && "hidden"}`}
          onClick={goToPrevious}
        >
          &lt;
        </button>
        <button
          className={`carousel-right-arrow ${images.length <= 1 && "hidden"}`}
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImagesCarousel;
