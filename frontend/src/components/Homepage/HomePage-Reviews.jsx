import React, { useState } from 'react';
import './HomePage-Reviews.css';
import NataliImg from '../../assets/Natali.jpg'; 
import GilImg from '../../assets/Gil.JPG'; 
import MaiaImg from '../../assets/Maia.JPG';
import AlexImg from '../../assets/Alex.JPG';
import EmmaImg from '../../assets/Emma.JPG';
import JohnImg from '../../assets/John.JPG';

const reviews = [
  { name: "דנה ה", text: "ממליצה בחום! בהתחלה הייתי סקפטית אבל הופתעתי לטובה!", img: NataliImg },
  { name: "גיל ב", text: "התהליך למציאת דירה היה מדויק להפליא ועזר לי להתנהל ביעילות.", img: GilImg },
  { name: "מאיה ל", text: "התהליך למציאת הדירה היה חלק ויעיל!", img: MaiaImg },
  { name: "אלכס מ", text: "שירות מעולה ומענה מהיר. מומלץ מאוד!", img: AlexImg },
  { name: "אמה ר", text: "החוויה באתר הייתה טובה ונוחה מאוד, תודה רבה!", img: EmmaImg },
  { name: "ג'ון ד", text: "לא הצלחתי למצוא דירה שמתאימה לי עד שהגעתי אליכם!", img: JohnImg }
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="reviews">
      <h2>לקוחות מרוצים</h2>
      <div className="reviews-container">
        <button className="arrow left-arrow" onClick={handlePrev}>◀</button>
        <div className="review-cards">
          {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
            <div className="review" key={index}>
              <img src={review.img} alt={review.name} />
              <p>{review.text}</p>
              <h3>{review.name}</h3>
            </div>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={handleNext}>▶</button>
      </div>
    </section>
  );
};

export default Reviews;
