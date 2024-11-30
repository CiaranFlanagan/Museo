// src/components/Favorites.tsx
import React, { useEffect, useState } from "react";
import { ArtworkType } from "../types";
import { fetchLikedArtworks } from "../services/artworkService";
import ArtworkCard from "./ArtworkCard";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Favorites: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const loadLikedArtworks = async () => {
    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchLikedArtworks(user.id);
      setArtworks(data);
    } catch {
      setError("Failed to load liked artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLikedArtworks();
  }, []);

  return (
    <div className="relative p-4 min-h-screen">
      <h1 className="text-2xl mb-4">Your Liked Artworks</h1>
      {loading && <p>Loading artworks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && artworks.length === 0 && <p>You have no liked artworks.</p>}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="flex items-center justify-center">
            <ArtworkCard artwork={artwork} onLike={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
