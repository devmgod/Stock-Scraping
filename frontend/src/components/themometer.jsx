import "./Thermometer.css"; // Make sure to update this CSS file

const Thermometer = ({ level, markers }) => {
  const levels = [
    { label: "MAX", color: "#4CAF50" },
    { label: "HIGH", color: "#8BC34A" },
    { label: "NORMAL", color: "#CDDC39" },
    { label: "MEDIUM", color: "#FFEB3B" },
    { label: "LOW", color: "#FFC107" },
    { label: "NO", color: "#FF5722" },
  ];

  const calculatePosition = (percentage) => {
    const height = 700; // Match this with your CSS for accurate positioning
    return height - (percentage / 100) * height;
  };

  return (
    <div>
      {markers.map((marker, index) => (
        <div
          key={index}
          className={`marker ${marker.side}`}
          style={{ top: `${calculatePosition(marker.percentage)}px` }}
        >
          {marker.label} {marker.percentage}%
        </div>
      ))}
      <div className="thermometer">
        {levels.map((level, index) => (
          <div
            key={index}
            className="level"
            style={{
              backgroundColor: level.color,
              height: `${100 / levels.length}%`,
            }}
          >
            {level.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thermometer;
