import React from 'react';
import './Footer.css';
import facebook from '../../assets/facebook.png'; 
import instagram from '../../assets/instagram.png'; 
import twitter from '../../assets/twitter.png'; 
import linkedin from '../../assets/linkedin.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><a href="/">דף הבית</a></li>
          <li><a href="/about">אודות</a></li>
          <li><a href="/matching">התאמת דירה</a></li>
          <li><a href="/for_sale_apartements">דירות למכירה</a></li>
          <li><a href="/for_rent_apartements">דירות להשכרה</a></li>
          <li><a href="/contact">צור קשר</a></li>
        </ul>
        <p>טלפון: 088671842 | אימייל: apartment-matcher@gmail.com | כתובת: רחוב הארבעה 30, תל אביב</p>
        <p>עקבו אחרינו במדיה החברתית:</p>
        <div className="social-icons">
          <a href="https://www.facebook.com"><img src={facebook} alt="Facebook" /></a>
          <a href="https://www.twitter.com"><img src={twitter} alt="Twitter" /></a>
          <a href="https://www.instagram.com"><img src={instagram} alt="Instagram" /></a>
          <a href="https://www.linkedin.com"><img src={linkedin} alt="Linkedin"/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
