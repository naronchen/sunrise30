import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Checkbox } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainTabsParamList } from "../navigation/MainTabs";
import { calculateTodayPosition } from "../services/firebaseUserService";


export default function ToDoScreen({ userData, updateUserData }: { userData: any, updateUserData: (newData: any) => void  }) {
  // const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkItems, setCheckItems] = useState([
    { label: "Silence - Meditation", checked: false },
    { label: "Affirmation", checked: false },
    { label: "Visualization", checked: false },
    { label: "Exercise", checked: false },
    { label: "Reading", checked: false },
    { label: "Scribing", checked: false },
  ]);
  
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>();

  const handleCheck = async (index: number) => {
    const updatedCheckItems = checkItems.map((item, i) => {
      if (i === index){
        return { ...item, checked: !item.checked };
      }
      return item;
    })
    setCheckItems(updatedCheckItems);
    const allChecked = updatedCheckItems.every((item) => item.checked);
    if (allChecked){
      setModalVisible(true);

      // update dayTracker in Firestore
      try {
        const userRef = firestore().collection("users").doc(userData.id);
        const updatedDayTracker = [...userData.dayTracker];
        const todayPosition = calculateTodayPosition(userData);
        if (todayPosition < 0) {
          console.error("Your StartDate is set after today");
          return;
        }
        updatedDayTracker[todayPosition] = 1;
        updateUserData({ ...userData, dayTracker: updatedDayTracker });
        // console.log(updatedDayTracker);
        await userRef.update({ dayTracker: updatedDayTracker });
        console.log("DayTracker updated in Firestore");
      } catch (error) {
        console.error("Failed to update Firestore:", error);
      }
    }
  };

  const closeModalAndNavigate = () => {
    setModalVisible(false);
    navigation.navigate("Home"); // Navigate to HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDoScreen</Text>
      { checkItems.map((item, index) => (
        <View style={styles.checkboxContainer} key={index}>
          <Checkbox
            status={item.checked ? "checked" : "unchecked"}
            onPress={() => handleCheck(index)}
            color="#4CAF50"
          />
          <Text>{item.label}</Text>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Congrats!</Text>
            <Button title="Go to Home" onPress={closeModalAndNavigate} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, marginBottom: 20 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 20, marginBottom: 15 },
});
