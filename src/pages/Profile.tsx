import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchLikedArtworks } from "../services/likedArtworkService";
import ArtworkCard from "../components/ArtworkCard";
import { ArtworkType } from "../types";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [likedArtworks, setLikedArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLikedArtworks = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchLikedArtworks(user.id);
          setLikedArtworks(data);
        } catch {
          setError("Failed to load liked artworks.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadLikedArtworks();
  }, [user]);

  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: "red" }}>
      <h1 className="text-2xl font-bold mb-4">My Liked Artworks</h1>
      {loading && <p>Loading liked artworks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {likedArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} onLike={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
