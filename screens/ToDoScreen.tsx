import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Checkbox } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainTabsParamList } from "../navigation/MainTabs";


export default function ToDoScreen({ userData }: { userData: any }) {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>();

  const handleCheck = async () => {
    setChecked(true); // Checkbox becomes checked
    setModalVisible(true); // Show the modal

    // Update the first element of the dayTracker array in Firestore
    try {
      const userRef = firestore().collection("users").doc(userData.id);
      // console.log("Updating Firestore...");
      // console.log(userData.id);
      const updatedDayTracker = [...userData.dayTracker];
      updatedDayTracker[0] = 1; // Set the first element to 1
      // console.log(updatedDayTracker);
      await userRef.update({ dayTracker: updatedDayTracker });
      console.log("DayTracker updated in Firestore");
    } catch (error) {
      console.error("Failed to update Firestore:", error);
    }
  };

  const closeModalAndNavigate = () => {
    setModalVisible(false);
    navigation.navigate("Home"); // Navigate to HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDoScreen</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={handleCheck}
          color="#4CAF50"
        />
        <Text>Complete Task</Text>
      </View>

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
