import { useEffect, useState } from "react";
import "./InitialLoader.scss";

export const InitialLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`initial-loader ${visible ? "show" : "hide"}`}>
      <div className="loader-content">
        <p className="title">RentAVan</p>
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};
