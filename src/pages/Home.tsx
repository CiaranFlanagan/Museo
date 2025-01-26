import React from "react";
import ArtworksGrid from "../components/ArtworkGrid";

const Home: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen p-4"
      style={{ backgroundColor: "#DFB9B3" }}
    >
      <div className="flex justify-between items-center mb-4"></div>
      <ArtworksGrid />
    </div>
  );
};

export default Home;
