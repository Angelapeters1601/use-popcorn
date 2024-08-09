function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>⛔</span>
      <h2>{message}</h2>
    </div>
  );
}

export default ErrorMessage;
