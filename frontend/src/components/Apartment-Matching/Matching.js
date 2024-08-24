import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Matching.css';
import axios from 'axios';

const Matching = () => {
  // State for different form fields - each field is a number except the "rent or sale".
  const [rentOrSale, setRentOrSale] = useState('sale'); 
  const [floor, setFloor] = useState(0); 
  const [beds, setBeds] = useState(0); 
  const [priceRange, setPriceRange] = useState([0, 50000000]); 
  const [sizeRange, setSizeRange] = useState([0, 10000]);
  const [tags, setTags] = useState({
    schools: 0,
    religious: 0,
    secular: 0,
    families: 0,
    parks: 0,
    train: 0,
    quiet: 0,
  }); 

  // State for the errors
  const [floorError, setFloorError] = useState(''); 
  const [bedsError, setBedsError] = useState(''); 

  // Format numbers with commas 
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTags({ ...tags, [name]: Number(value) }); 
  };

  const handleFloorChange = (e) => {
    const value = Number(e.target.value); 
    if (value < 0 || value > 100) {
      setFloorError('ערך הקומה חייב להיות בין 0 ל-100'); // error message if the value is out of range
    } else {
      setFloorError(''); 
      setFloor(value); 
    }
  };

  const handleBedsChange = (e) => {
    const value = Number(e.target.value); 
    if (value < 0 || value > 20) {
      setBedsError('מספר חדרי השינה חייב להיות בין 0 ל-20'); 
    } else {
      setBedsError(''); 
      setBeds(value); 
    }
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleSizeRangeChange = (values) => {
    setSizeRange(values);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (floorError || bedsError) {
      return;
    }
    
    const formData = {
        rentOrSale,
        floor,
        beds,
        minPrice: priceRange[0], 
        maxPrice: priceRange[1],  
        minSize: sizeRange[0],    
        maxSize: sizeRange[1],    
        tags, 
    };

    // Sending the form using Axios
    try {
      const response = await axios.post('http://localhost:5000/api/apartments/match', formData);
      console.log('Response:', response.data);
      //Here I should display all the matching apartments after the results return.
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <section className="matching-section">
      <h2>טופס התאמת דירה</h2>
      <p>שלום, כאן נבקש ממך לענות על מספר שאלות על מנת שנוכל לקבוע בצורה הטובה ביותר איזו דירה היא המושלמת בשבילך!</p><br/>
      <form className="matching-form" onSubmit={handleSubmit}>
        <label>
          סוג הדירה:
          <select value={rentOrSale} onChange={(e) => setRentOrSale(e.target.value)}>
            <option value="rent">להשכרה</option>
            <option value="sale">למכירה</option>
          </select>
        </label>

        <label>
          קומה:
          <input 
            type="number" 
            value={floor} 
            onChange={handleFloorChange} 
            min="0" 
            max="100" 
          />
          {floorError && <span className="error-message">{floorError}</span>}
        </label>

        <label>
          מספר חדרי שינה:
          <input 
            type="number" 
            value={beds} 
            onChange={handleBedsChange} 
            min="0" 
            max="10" 
          />
          {bedsError && <span className="error-message">{bedsError}</span>}
        </label>

        <label>
          טווח מחירים:
          <Slider
            range
            value={priceRange}
            onChange={handlePriceRangeChange}
            min={0}
            max={50000000}
            step={10000}
            reverse={true} 
          />
          <div className="range-values">
            <span>מ- {formatNumber(priceRange[0])} ש"ח</span>
            <span>עד- {formatNumber(priceRange[1])} ש"ח</span> 
          </div>
        </label>

        <label>
          טווח גודל הדירה:
          <Slider
            range
            value={sizeRange}
            onChange={handleSizeRangeChange}
            min={0}
            max={10000}
            step={10}
            reverse={true}
          />
          <div className="range-values">
            <span>מ- {formatNumber(sizeRange[0])} מ"ר</span>
            <span>עד- {formatNumber(sizeRange[1])} מ"ר</span>  
          </div>
        </label>
        <p>אנא דרגו את הפרמטרים הבאים לפי חשיבותם עבורכם (1 - לא חשוב בכלל, 5 - חשוב לי מאוד)</p>
        {[
          { key: 'schools', label: 'קרבה לבתי ספר' },
          { key: 'religious', label: 'התאמה לדתיים' },
          { key: 'secular', label: 'התאמה לחילונים' },
          { key: 'families', label: 'התאמה למשפחות' },
          { key: 'parks', label: 'קרבה לפארקים' },
          { key: 'train', label: 'קרבה לרכבת' },
          { key: 'quiet', label: 'רחוב שקט' }
        ].map(({ key, label }) => (
          <div key={key} className="tag-container">
            <div className="tag-label">
              <p>{label}</p>
              <div className="checkbox-group">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="checkbox-label">
                    <input 
                      type="radio" 
                      name={key} 
                      value={value} 
                      checked={tags[key] === value} 
                      onChange={handleTagChange} 
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button type="submit">שלח</button><br/>
      </form>
    </section>
  );
};

export default Matching;
