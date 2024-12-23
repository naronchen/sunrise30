import firestore from '@react-native-firebase/firestore';



// Retrieve or create a user in Firestore
export const createUser = async (userId: string, userData: { name: string; email: string, photo: string }) => {
  try {
    const usersRef = firestore().collection('users');
    const userRef = usersRef.doc(userId);

    const now = new Date();
    const firestoreTimestamp = {
      seconds: Math.floor(now.getTime() / 1000),
      nanoseconds: (now.getTime() % 1000) * 1e6, 
    };
    
    const tracker = Array(30).fill(0);
    now.setHours(0, 0, 0, 0);

    await userRef.set({
      id: userId,
      name: userData.name,
      email: userData.email,
      photo: userData.photo,
      joinDate: firestore.FieldValue.serverTimestamp(),
      dayTracker: tracker,
      startDate: now,
    });
    console.log('User added to Firestore');

    return { 
      id: userId, 
      name: userData.name, 
      email: userData.email, 
      photo: userData.photo,
      joinDate: firestoreTimestamp, 
      dayTracker: tracker,
      startDate: now
    };

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
