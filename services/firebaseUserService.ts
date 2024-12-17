import firestore from '@react-native-firebase/firestore';

// Retrieve or create a user in Firestore
export const getOrCreateUser = async (userId: string, userData: { name: string; email: string, photo: string }) => {
  try {
    const usersRef = firestore().collection('users');
    const userRef = usersRef.doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      // Create a new user entry if it doesn't exist
      const tracker = Array(30).fill(0);

      await userRef.set({
        name: userData.name,
        email: userData.email,
        photo: userData.photo,
        joinDate: firestore.FieldValue.serverTimestamp(),
        dayTracker: tracker,
      });
      console.log('User added to Firestore');
      return { name: userData.name, email: userData.email, joinDate: new Date().toISOString() };
    } else {
      console.log('User already exists in Firestore');
      return doc.data();
    }
  } catch (error) {
    console.error('Error retrieving or creating user:', error);
    throw error;
  }
};

// Fetch an existing user's data
export const getUser = async (userId: string) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
      return doc.data();
    } else {
      console.log('No user found with the given ID');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
