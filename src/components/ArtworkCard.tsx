import React, { useState } from "react";
import { ArtworkType } from "../types";

interface ArtworkCardProps {
  artwork: ArtworkType;
  onLike: (artwork: ArtworkType) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onLike }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div
      className="relative border rounded-md overflow-hidden shadow-md cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={artwork.imageUrl || "/placeholder.jpg"}
        alt={artwork.title}
        className={`w-full h-auto max-h-full transition-opacity duration-500 ${
          showInfo ? "opacity-50" : "opacity-100"
        }`}
        style={{ objectFit: "contain" }} 
      />
      {showInfo && (
        <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 flex flex-col justify-center transition-opacity duration-500">
          <h2 className="text-xl font-bold mb-2">{artwork.title}</h2>
          <p className="mb-1">Artist: {artwork.artist || "Unknown"}</p>
          <p className="mb-1">Date: {artwork.objectDate || "N/A"}</p>
          <p className="mb-1">Medium: {artwork.medium || "N/A"}</p>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onLike(artwork);
        }}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
      >
        ❤️
      </button>
    </div>
  );
};

export default ArtworkCard;
