import React from 'react';
import './Contact.css';
import facebook from '../../assets/facebook.png'; 
import instagram from '../../assets/instagram.png'; 
import twitter from '../../assets/twitter.png'; 
import linkedin from '../../assets/linkedin.png'; 

const Contact = () => {
  return (
    <section className="contact">
      <h2>צור קשר</h2>
      <div className="contact-details">
        <p>טלפון: 088671842</p>
        <p>אימייל: <a href="mailto:apartment-matcher@gmail.com">apartment-matcher@gmail.com</a></p>
        <p>כתובת: רחוב הארבעה 30, תל אביב</p>
      </div>
      <h3>עקבו אחרינו במדיה החברתית:</h3>
      <div className="social-media">
        <a href="https://www.facebook.com"><img src={facebook} alt="Facebook"/></a>
        <a href="https://www.twitter.com"><img src={twitter} alt="Twitter"/></a>
        <a href="https://www.instagram.com"><img src={instagram} alt="Instagram"/></a>
        <a href="https://www.linkedin.com"><img src={linkedin} alt="Linkedin"/></a>
      </div>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.7707987878663!2d34.77988761515664!3d32.07314032615145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b76d3e7be6b%3A0x7d55d4d1b9458482!2sHaArba&#39;a%2030%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1638091328390!5m2!1sen!2sil" 
          width="600" 
          height="450" 
          title="Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
