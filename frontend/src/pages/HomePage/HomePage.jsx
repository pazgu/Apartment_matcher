import React, { useState } from "react";
import "./HomePage.css";
import NataliImg from "../../assets/Natali.jpg";
import GilImg from "../../assets/Gil.JPG";
import MaiaImg from "../../assets/Maia.JPG";
import AlexImg from "../../assets/Alex.JPG";
import EmmaImg from "../../assets/Emma.JPG";
import JohnImg from "../../assets/John.JPG";
import houseImage from "../../assets/hpimg.jpeg";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "דנה ה",
    text: "ממליצה בחום! בהתחלה הייתי סקפטית אבל הופתעתי לטובה!",
    img: NataliImg,
  },
  {
    name: "גיל ב",
    text: "התהליך למציאת דירה היה מדויק להפליא ועזר לי להתנהל ביעילות.",
    img: GilImg,
  },
  { name: "מאיה ל", text: "התהליך למציאת הדירה היה חלק ויעיל!", img: MaiaImg },
  { name: "אלכס מ", text: "שירות מעולה ומענה מהיר. מומלץ מאוד!", img: AlexImg },
  {
    name: "אמה ר",
    text: "החוויה באתר הייתה טובה ונוחה מאוד, תודה רבה!",
    img: EmmaImg,
  },
  {
    name: "ג'ון ד",
    text: "לא הצלחתי למצוא דירה שמתאימה לי עד שהגעתי אליכם!",
    img: JohnImg,
  },
];

const Home = () => {
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
    <div className="home">
      <section className="section">
        <h1>התאמת דירה ללקוח</h1>
        <p>
          ברוכים הבאים לאתר המושלם עבורכם למציאת דירה! <br />
          הפלטפורמה החדשנית שלנו נועדה לחבר אתכם עם הדירה המושלמת המותאמת לצרכים
          ולהעדפות הייחודיות שלכם. <br />
          כל מה שעליכם לעשות הוא לספק לנו פרטים על הדירה הרצויה, לענות על מספר
          שאלות, ותנו לנו לעשות את השאר.
          <br />
          בין אם אתם מחפש את בית החלומות שלכם או סקרנים לגבי שווי השוק של דירה,
          כלי החיזוי החכם שלנו מציע הערכות עלויות מדויקות על סמך מיקום, גודל
          וגורמי מפתח נוספים.
          <br />
          התחילו את המסע שלך איתנו כבר היום!
        </p>
        <div className="section-buttons">
          <Link to="/matching">
            <button>לחצו כאן למעבר לטופס התאמת דירה</button>
          </Link>
        </div>
      </section>

      <section className="image-section">
        <img src={houseImage} alt="House" />
      </section>

      <section className="reviews">
        <h2>לקוחות מרוצים</h2>
        <div className="reviews-container">
          <button className="arrow left-arrow" onClick={handlePrev}>
            ▶
          </button>
          <div className="review-cards">
            {reviews
              .slice(currentIndex, currentIndex + 3)
              .map((review, index) => (
                <div className="review" key={index}>
                  <img src={review.img} alt={review.name} />
                  <p>{review.text}</p>
                  <h3>{review.name}</h3>
                </div>
              ))}
          </div>
          <button className="arrow right-arrow" onClick={handleNext}>
            ◀
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
