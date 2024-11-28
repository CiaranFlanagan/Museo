import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;