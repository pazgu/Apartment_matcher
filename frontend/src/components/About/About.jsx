import React from 'react';
import './About.css';
import Student1Img from '../../assets/student1.JPG';
import Student2Img from '../../assets/student2.JPG';
import Student3Img from '../../assets/student3.JPG';
import Student4Img from '../../assets/student4.JPG';
import HistoryImg from '../../assets/HistoryImg.JPG'; 
import IdeaImg from '../../assets/IdeaImg.JPG'; 
import CompetitorsImg from '../../assets/CompetitorsImg.JPG'; 

const About = () => {
  return (
    <section className="about">
      <h2>אודות האתר וחברי הצוות</h2>
      <div className="about-section">
        <img src={HistoryImg} alt="History" className="about-image" />
        <div className="about-text">
          <h3>איך הכל התחיל?</h3>
          <p>התחלנו את דרכנו מתוך רצון לספק פתרון אמיתי לאנשים שמחפשים דירה בצורה חכמה ויעילה. כיום, רוכשי ושוכרי דירות מתקשים למצוא את הדירה המתאימה ביותר לצרכיהם מבין מאות ואלפי מודעות הקיימות בשוק. לכן, רצינו ליצור מערכת שתתאים באופן אישי דירות ללקוחות פוטנציאליים על פי העדפותיהם ודרישותיהם.</p>
        </div>
      </div>
      
      <div className="about-section">
        <img src={IdeaImg} alt="Idea" className="about-image" />
        <div className="about-text">
          <h3>מאיפה בא הרעיון?</h3>
          <p>הרעיון לאתר נולד מתוך צורך אישי למציאת דירה של אחד מחברי הצוות. תהליכי החיפוש המסורבלים ואי מציאת דירה שעונה בדיוק על כל הצרכים, הובילו אותנו לחשוב על פתרון טכנולוגי מתקדם.</p>
        </div>
      </div>

      <div className="about-section">
        <img src={CompetitorsImg} alt="Competitors" className="about-image" />
        <div className="about-text">
          <h3>למה לבחור בנו על פני המתחרים?</h3>
          <p>הטכנולוגיה שלנו מתקדמת ונעזרת בבינה מלאכותית על מנת למצוא לכם את הדירה המושלמת במהירות ודיוק מירביים.</p>
        </div>
      </div>

      <h2>הצוות שלנו</h2>
      <div className="about-container">
        <div className="about-item">
          <img src={Student1Img} alt="Student 1" />
          <p><strong>יותם זאבי פדרמן</strong><br/>אחראי על הבאת הנתונים ויצירת האלגוריתם</p>
        </div>
        <div className="about-item">
          <img src={Student2Img} alt="Student 2" />
          <p><strong>חנה סופר</strong><br/>אחראית על פיתוח צד הלקוח</p>
        </div>
        <div className="about-item">
          <img src={Student3Img} alt="Student 3" />
          <p><strong>פז גואטה</strong><br/>אחראית על צד השרת בשימוש NodeJS</p>
        </div>
        <div className="about-item">
          <img src={Student4Img} alt="Student 4" />
          <p><strong>סטיב חולופ</strong><br/>אחראי על פיתוח צד הלקוח באמצעות React</p>
        </div>
      </div>
    </section>
  );
};

export default About;
