import "./ScoreBar.css";

const ScoreBar = ({ score = 0 }) => {
  return (
    <div className="score-bar-container">
      <div
        className="score-bar-score"
        style={{
          width: score * 30 + "px",
        }}
      ></div>
    </div>
  );
};

export default ScoreBar;
