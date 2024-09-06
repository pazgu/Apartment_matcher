import { useLocation, useParams } from "react-router-dom";
import "./ApartmentPage.css";
import ImagesCarousel from "../../components/ImagesCarousel/ImagesCarousel";
import ScoreBar from "../../components/ScoreBar/ScoreBar";
import { useEffect, useState } from "react";
import axios from "axios";

const translations = {
  school: "בתי ספר",
  secular: "חילוני",
  religious: "אופי דתי",
  parks: "פארקים",
  quiet_street: "רחוב שקט",
  families: "משפחתי",
  light_trail: "אורות  רחוב",
};

const ApartmentPage = () => {
  const { id } = useParams();

  const location = useLocation();
  const endpoint = location.state?.endpoint;

  const [loading, setLoading] = useState(false);
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    fetchApartments();
  }, []);

  console.log(`http://localhost:5000/api/apartments/${endpoint}/${id}`);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/apartments/${endpoint}/${id}`
      );

      setApartment(response.data);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!apartment) {
    return <h1>Waiting</h1>;
  }

  const { address, price, deal_type, beds, floor, tags, insights, images } =
    apartment;
  const size = apartment["size_m^2"];

  const groupedInsights =
    insights &&
    Object.groupBy(insights, ({ insight_category }) => insight_category);

  return (
    <div className="apartment-page-container">
      <div className="apartment-page-wrapper">
        <div className="apartment-page-imgs-carousel-wrapper">
          <ImagesCarousel images={images} />
        </div>
        <div className="apartment-page-content-wrapper">
          <div className="apartment-page-header">
            <h3>{address}</h3>
            <h3>{price} ש"ח</h3>
          </div>
          <div className="apartment-page-content">
            <p>{deal_type}</p>
            <p>
              {beds} חדרים | קומה {floor} | {size} מ"ר
            </p>
          </div>
          <h4>תיאור הנכס</h4>
          <div className="apartment-page-description-wrapper">
            <div className="apartment-page-tags">
              {tags &&
                tags.map(({ tag_category, tag_value }) => {
                  return (
                    <div className="apartment-page-tag">
                      {/* <p>{tag_category.replace("_", " ")}:</p> */}
                      <p>{translations[tag_category] ?? tag_category}</p>
                      <ScoreBar score={tag_value} />
                    </div>
                  );
                })}
            </div>
            <div className="apartment-page-insights-container">
              {groupedInsights &&
                Object.keys(groupedInsights).map((key) => {
                  const values = groupedInsights[key];
                  return (
                    <div className="apartment-page-insights-wrapper">
                      <p className="apartment-page-insights-category">{key}</p>
                      {values.map(({ insight_value }) => {
                        return (
                          <div className="apartment-page-insight-value-wrapper">
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
