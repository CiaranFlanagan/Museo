import { supabase } from '../supabaseClient';
import { ArtworkType } from '../types';

export const fetchRandomArtworks = async (count: number = 4) => {
    //calculated in jupyter notebook in DS3000 folder
    const maxObjectID = 484956; 
    const artworks: { id: number; title: string; artist: string; imageUrl: string; department: string; culture: string; medium: string; dimensions: string; creditLine: string; objectDate: string }[] = [];
  
    while (artworks.length < count) {
      const randomID = Math.floor(Math.random() * maxObjectID) + 1;
      //does the object ID exists?
      const exists = await checkIfObjectExists(randomID);
      if (exists) {
        const artwork = await fetchArtworkByID(randomID);
        if (artwork.imageUrl) {
          artworks.push(artwork);
        }
      }
    }
  
    return artworks;
  };
  
  //helper
  const checkIfObjectExists = async (objectID: number) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    return response.status === 200;
  };
  
  //helper
  const fetchArtworkByID = async (objectID: number) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const data = await response.json();
    //might need to add more fields later
    return {
      id: data.objectID,
      title: data.title,
      artist: data.artistDisplayName,
      imageUrl: data.primaryImageSmall || data.primaryImage,
      department: data.department,
      culture: data.culture,
      medium: data.medium,
      dimensions: data.dimensions,
      creditLine: data.creditLine,
      objectDate: data.objectDate,
    };
  };

  export const saveLikedArtwork = async (artwork: ArtworkType, userID: string) => {
    const { data, error } = await supabase.from('liked_artworks').insert([
    {
      user_id: userID,
      artwork_data: artwork,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
  };

  export const fetchLikedArtworks = async (userId: string): Promise<ArtworkType[]> => {
    //ensure the UserID matches!
    const { data, error } = await supabase.from('liked_artworks').select('artwork_data').eq('user_id', userId).order('created_at', { ascending: false});
    if (error) {
      throw error;
    }
  
    //extract artwork_data from the returned data
    return data.map((item) => item.artwork_data as ArtworkType);
  };