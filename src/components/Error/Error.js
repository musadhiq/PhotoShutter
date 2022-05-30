import { useEffect } from "react";

const Error = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
    // eslint-disable-next-line
  }, [error]);
  return (
    <div className="error">
      <p className="error-msg">{error}</p>
    </div>
  );
};

export default Error;
