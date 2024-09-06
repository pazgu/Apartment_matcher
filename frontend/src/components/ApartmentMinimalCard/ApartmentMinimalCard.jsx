import { Link } from "react-router-dom";
import "./ApartmentMinimalCard.css";

const fallbackUrl =
  "https://t3.ftcdn.net/jpg/01/05/82/76/360_F_105827660_Gifynz6B7PPcOvPsjW54zUMZI6G1VWlc.jpg";

const ApartmentMinimalCard = ({ apartment, endpoint }) => {
  const {
    beds,
    floor,
    address,
    images,
    deal_type,
    size_m2,
    similarity_score,
    price,
  } = apartment;

  const onImgError = (e) => {
    e.target.src = fallbackUrl;
  };

  let imgSrc;
  if (!images || !images[0] || !images[0].image_url) {
    imgSrc = "";
  } else {
    imgSrc = images[0].image_url;
  }

  const similarityPercentage = similarity_score
    ? (similarity_score * 100).toFixed(2)
    : null;

  return (
    <div className="apartment-minimal-card-container">
      <Link to={`/apartment/${apartment.id}?endpoint=${endpoint}`}>
        <div className="apartment-minimal-card-img-wrapper">
          <img
            className="apartment-minimal-card-img"
            src={imgSrc}
            alt="Apartment"
            height="240"
            width="320"
            onError={(e) => onImgError(e)}
          />
        </div>
        <div className="apartment-minimal-card-content-wrapper">
          <p>
            {deal_type} - {beds} חדרים - קומה {floor} - {size_m2} מ"ר
          </p>
          <p>{address}</p>
          <p>מחיר - {price.toLocaleString()} ₪</p>
          {similarityPercentage && (
            <p>
              אחוז התאמה - <b>{similarityPercentage}%</b>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ApartmentMinimalCard;
