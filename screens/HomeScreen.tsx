import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";


const HomeScreen = ({ userData }: { userData: any }) => {
  console.log("userData", userData);
  const [dayTracker, setDayTracker] = useState(userData?.dayTracker);

  useFocusEffect(
    useCallback(() => {
      const fetchDayTracker = async () => {
        if (!userData?.id) {
          console.log("userData.id is null, skipping fetch.");
          return; // Do not proceed if userData.id is null
        }
  
        try {
          console.log("Fetching Firestore data in home...");
          const userRef = firestore().collection("users").doc(userData.id);
          const doc = await userRef.get();
          if (doc.exists) {
            setDayTracker(doc.data()?.dayTracker);
          }
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
        }
      };
  
      fetchDayTracker();
    }, [userData])
  );
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>DayTracker: {JSON.stringify(dayTracker)}</Text>
    </View>
  );
};

export default HomeScreen;
