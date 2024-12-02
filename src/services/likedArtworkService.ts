import { supabase } from '../supabaseClient';

// Add a liked artwork
interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
}

export const addLikedArtwork = async (userId: string, artwork: Artwork) => {
  const { error } = await supabase
    .from('liked_artworks')
    .insert([
      {
        user_id: userId,
        artwork_id: artwork.id,
        title: artwork.title,
        artist: artwork.artist,
        image_url: artwork.imageUrl,
      },
    ]);

  if (error) {
    console.error('Error liking artwork:', error);
    return false;
  }
  return true;
};

// Fetch liked artworks
export const fetchLikedArtworks = async (userId: string) => {
  const { data, error } = await supabase
    .from('liked_artworks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching liked artworks:', error);
    return [];
  }

  return data;
};