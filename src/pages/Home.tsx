import React from "react";
import { useAuth } from "../context/AuthContext";
import ArtworksGrid from "../components/ArtworkGrid";

const Home: React.FC = () => {
  //user defined as User from supabase
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>
          Welcome,{" "}
          {
            //optional chaning -> evaluates to undefined if email is null/undefined
            user?.email
          }
        </h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Sign Out
        </button>
      </div>
      <ArtworksGrid />
    </div>
  );
};

export default Home;
