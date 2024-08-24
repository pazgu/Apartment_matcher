import { useParams } from "react-router-dom";
import "./ApartmentPage.css";
import ImagesCarousel from "../../components/ImagesCarousel/ImagesCarousel";
import ScoreBar from "../../components/ScoreBar/ScoreBar";

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

  // TODO fetch apartment by id

  const apartment = {
    id: "j8u0WeM1pVO",
    lat: 32.0699595239,
    lng: 34.7801597283,
    create_date: "2024-01-11 18:53:34",
    address: 'ביל"ו 21, תל אביב יפו',
    city: "תל אביב יפו",
    floor: 0,
    deal_type: "למכירה",
    beds: 3,
    price: 4500000,
    "size_m^2": 63,
    condition: "משופץ",
    url: "https://www.madlan.co.il/listings/j8u0WeM1pVO",
    tags: [
      {
        tag_category: "school",
        tag_value: 5.0,
      },
      {
        tag_category: "secular",
        tag_value: 5.0,
      },
      {
        tag_category: "religious",
        tag_value: 5.0,
      },
      {
        tag_category: "parks",
        tag_value: 2.0,
      },
      {
        tag_category: "quiet_street",
        tag_value: 1.0,
      },
      {
        tag_category: "families",
        tag_value: 3.0,
      },
      {
        tag_category: "light_trail",
        tag_value: 2.0,
      },
    ],
    insights: [
      {
        insight_category: "חיים",
        insight_value: "יש הרבה גינות ציבוריות וגני משחקים בסביבה",
      },
      {
        insight_category: "חיים",
        insight_value: "הגינה הציבורית סובלת מרעש מאתר בניה סמוך",
      },
      {
        insight_category: "חיים",
        insight_value: "גן עדן קולינרי: יש כאן מגוון רחב מאוד של מסעדות",
      },
      {
        insight_category: "חיים",
        insight_value: "בשכונה יש התארגנויות תושבים אפקטיביות",
      },
      {
        insight_category: "תחבורה",
        insight_value: "פקקים ומצוקת חנייה",
      },
      {
        insight_category: "תחבורה",
        insight_value: "יש שבילי אופניים, והמצב עוד ישתפר",
      },
      {
        insight_category: "תחבורה",
        insight_value: "מרבית העובדים באזור מגיעים ממרכז הארץ",
      },
      {
        insight_category: "תחבורה",
        insight_value: "קווי אוטובוסים רבים עוברים בסביבה",
      },
      {
        insight_category: "ידידותי למשפחה",
        insight_value: "סביבה מתאימה למשפחות",
      },
      {
        insight_category: "תחבורה",
        insight_value: "רכבת קלה תפעל באזור בסביבות 2022",
      },
      {
        insight_category: "תכנון",
        insight_value: "בניה חדשה ליד הנכס",
      },
      {
        insight_category: "חיים",
        insight_value: "Limited park access",
      },
      {
        insight_category: "חיים",
        insight_value: "רחוב מגורים שקט",
      },
    ],
    images: [
      {
        image_url:
          "https://images2.madlan.co.il/t:nonce:v=2;resize:height=640;convert:type=webp/bulletin/j8u0WeM1pVO/QiDvp.jpg",
        image_id: "QiDvp",
      },
      {
        image_url:
          "https://images2.madlan.co.il/t:nonce:v=2;resize:height=640;convert:type=webp/bulletin/j8u0WeM1pVO/Zuew6.jpg",
        image_id: "Zuew6",
      },
      {
        image_url:
          "https://images2.madlan.co.il/t:nonce:v=2;resize:height=640;convert:type=webp/bulletin/j8u0WeM1pVO/B37hM.jpg",
        image_id: "B37hM",
      },
      {
        image_url:
          "https://images2.madlan.co.il/t:nonce:v=2;resize:height=640;convert:type=webp/bulletin/j8u0WeM1pVO/chFeVP.jpg",
        image_id: "chFeVP",
      },
    ],
  };

  const { address, price, deal_type, beds, floor, tags, insights, images } =
    apartment;
  const size = apartment["size_m^2"];

  const groupedInsights = Object.groupBy(
    insights,
    ({ insight_category }) => insight_category
  );

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
              {tags.map(({ tag_category, tag_value }) => {
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
              {Object.keys(groupedInsights).map((key) => {
                const values = groupedInsights[key];
                return (
                  <div className="apartment-page-insights-wrapper">
                    <p className="apartment-page-insights-category">{key}</p>
                    {values.map(({ insight_value }) => {
                      return (
                        <div className="apartment-page-insight-value-wrapper">
                          &emsp; <div className="apartment-page-insight-dot" />{" "}
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
