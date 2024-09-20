import { useParams } from "react-router-dom";
import "./ApartmentPage.css";
import ImagesCarousel from "../../components/ImagesCarousel/ImagesCarousel";
import ScoreBar from "../../components/ScoreBar/ScoreBar";
import { useEffect, useState } from "react";
import axios from "axios";

const translations = {
  school: "קרבה לבתי ספר",
  secular: "התאמה לחילונים",
  religious: "התאמה לדתיים",
  parks: "קרבה לפארקים",
  quiet_street: "רחוב שקט",
  families: "התאמה למשפחות",
  light_trail: "קרבה לרכבת",
};

const ApartmentPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/apartments/all/${id}`
        );

        setApartment(response.data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [id]);

  if (loading) {
    return (
      <div className="apartment-page-waiting-wrapper">
        <h1>טוען...</h1>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="apartment-page-error-wrapper">
        <h1>מצטערים, נוצרה תקלה בזמן הבאת הידע שביקשת...</h1>
        <h2>אנא נסה שנית מאוחר יותר.</h2>
      </div>
    );
  }

  const { address, price, deal_type, beds, floor, tags, insights, images } =
    apartment;

  const size = apartment["size_m2"];

  const groupedInsights = insights
    ? Object.groupBy(insights, (item) => item.insight_category)
    : null;

  return (
    <div className="apartment-page-container">
      <div className="apartment-page-wrapper">
        {images && (
          <div className="apartment-page-imgs-carousel-wrapper">
            <ImagesCarousel images={images} />
          </div>
        )}
        <div className="apartment-page-content-wrapper">
          <div className="apartment-page-header">
            <h3>{address}</h3>
            <h3>{price.toLocaleString()} ש"ח</h3>
          </div>
          <div className="apartment-page-content">
            <p>{deal_type}</p>
            <p>
              {beds} חדרים | קומה {floor} | {size.toLocaleString()} מ"ר
            </p>
          </div>
          <h4>תיאור הנכס</h4>
          <div className="apartment-page-description-wrapper">
            <div className="apartment-page-tags">
              {tags &&
                tags.map(({ tag_category, tag_value }, index) => {
                  return (
                    <div className="apartment-page-tag" key={index}>
                      <p>{translations[tag_category] ?? tag_category}</p>
                      <ScoreBar score={tag_value} />
                    </div>
                  );
                })}
            </div>
            <div className="apartment-page-insights-container">
              {groupedInsights &&
                Object.keys(groupedInsights).map((key, index) => {
                  const values = groupedInsights[key];
                  return (
                    <div
                      className="apartment-page-insights-wrapper"
                      key={index}
                    >
                      <p className="apartment-page-insights-category">{key}</p>
                      {values.map(({ insight_value }, index) => {
                        return (
                          <div
                            className="apartment-page-insight-value-wrapper"
                            key={index}
                          >
                            &emsp;{" "}
                            <div className="apartment-page-insight-dot" />{" "}
                            {insight_value}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentPage;
