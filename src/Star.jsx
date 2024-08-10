import FullStar from "./FullStar";
import EmptyStar from "./EmptyStar";

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    color,
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <FullStar color={color} /> : <EmptyStar color={color} />}
    </span>
  );
}
export default Star;
