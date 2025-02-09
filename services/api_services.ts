import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase_config'; // Ensure db is initialized correctly

export const movieService = {
  // Get all movies
  getAllMovies: async () => {
    try {
      const moviesCollection = collection(db, 'movies'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllMostTranding: async () => {
    try {
      const moviesCollection = collection(db, 'Most Trending'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllContinueWatching: async () => {
    try {
      const moviesCollection = collection(db, 'Continue Watching'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllForYou: async () => {
    try {
      const moviesCollection = collection(db, 'for you'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllDrama: async () => {
    try {
      const moviesCollection = collection(db, 'drama'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllRomance: async () => {
    try {
      const moviesCollection = collection(db, 'Romance'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getAllDocumentary: async () => {
    try {
      const moviesCollection = collection(db, 'Documentary'); // Reference to 'movies' collection
      const moviesSnapshot = await getDocs(moviesCollection); // Get documents
      return moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
};
