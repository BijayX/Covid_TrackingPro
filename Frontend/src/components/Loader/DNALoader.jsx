import React from "react";
import "./DNALoader.css"; // Ensure you create and include the CSS file

const DNALoader = () => {
  return (
    <div className="dna-spinner">
      <div className="double-helix">
        <div className="helix"></div>
        <div className="helix"></div>
      </div>
    </div>
  );
};

export default DNALoader;
