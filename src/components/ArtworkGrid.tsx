import React, { useEffect, useState } from "react";
import { fetchRandomArtworks } from "../services/artworkService";
import ArtworkCard from "./ArtworkCard";
import { ArtworkType } from "../types";

const ArtworksGrid: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadArtworks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRandomArtworks();
      setArtworks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load artworks.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const handleLike = (artwork: ArtworkType) => {
    //log the liked artwork until i set up databse
    console.log("Liked artwork:", artwork);
  };

  return (
    <div className="relative p-4 min-h-screen">
      <button
        onClick={loadArtworks}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Get New Artworks
      </button>
      {loading && <p>Loading artworks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="flex items-center justify-center">
            <ArtworkCard artwork={artwork} onLike={handleLike} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksGrid;
