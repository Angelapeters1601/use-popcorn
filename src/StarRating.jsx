// imported on main.jsx for reusability

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  linHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating = 7 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {/* Array.from was used to generate length, (_, i) was used as mapping function */}
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
