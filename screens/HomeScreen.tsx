import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet  } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import Calendar from "../components/Calender";
import MainView from "../components/MainView";


const HomeScreen = ({ userData }: { userData: any }) => {
  console.log("userData", userData);
  const [dayTracker, setDayTracker] = useState<number[]>(userData?.dayTracker || []);

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
    <MainView title="" style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Calendar calendarData={dayTracker}/>
      </SafeAreaView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 25,
    marginLeft: 30,
  }
});

export default HomeScreen;
