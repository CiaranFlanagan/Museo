import React, { useEffect, useState } from "react";
import { fetchRandomArtworks } from "../services/artworkService";
import ArtworkCard from "./ArtworkCard";
import { ArtworkType } from "../types";
import { saveLikedArtwork } from '../services/artworkService';
import { useAuth } from '../context/AuthContext';

const ArtworksGrid: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadArtworks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRandomArtworks();
      //sets the artwoks from the api, handled by useState
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

  const { user } = useAuth();

  const handleLike = async (artwork: ArtworkType) => {
   if (!user) {
    console.error('User is not logged in!');
    return;
   }

   try {
    await saveLikedArtwork(artwork, user.id);
    console.log('Artwork has been liked:', artwork);
    } catch (error) {
      console.error('Artworl failed to save:', error);
    }
   };


  return (
    <div className="relative p-4 min-h-screen">
      <button
      //should call loadArtowks when the user want new artworks
        onClick={loadArtworks}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Get New Artworks
      </button>
      {loading && <p>Loading artworks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        {/*map a function that generates tsx for each artwork, passing each 
        artwork to ArtworkCard as a prop, and onLike as handleLike*/}
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
