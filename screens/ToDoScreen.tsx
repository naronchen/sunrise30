import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Animated } from "react-native";
import { Checkbox } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainTabsParamList } from "../navigation/MainTabs";
import { calculateTodayPosition } from "../services/firebaseUserService";
import firestore from "@react-native-firebase/firestore";

export default function ToDoScreen({ userData, updateUserData }: { userData: any, updateUserData: (newData: any) => void }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkItems, setCheckItems] = useState([
    { label: "Silence - Meditation", checked: false, animation: new Animated.Value(0) },
    { label: "Affirmation", checked: false, animation: new Animated.Value(0) },
    { label: "Visualization", checked: false, animation: new Animated.Value(0) },
    { label: "Exercise", checked: false, animation: new Animated.Value(0) },
    { label: "Reading", checked: false, animation: new Animated.Value(0) },
    { label: "Scribing", checked: false, animation: new Animated.Value(0) },
  ]);

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>();

  const handleCheck = async (index: number) => {
    const updatedCheckItems = checkItems.map((item, i) => {
      if (i === index) {
        if (!item.checked) {
          Animated.timing(item.animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(item.animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCheckItems(updatedCheckItems);

    const allChecked = updatedCheckItems.every((item) => item.checked);
    if (allChecked) {
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
      {checkItems.map((item, index) => (
        <View style={styles.checkboxContainer} key={index}>
          <Checkbox
            status={item.checked ? "checked" : "unchecked"}
            onPress={() => handleCheck(index)}
            color="#66C2E9"
            />
          <Animated.Text
            style={[
              styles.label,
              {
                opacity: item.checked ? item.animation : 1, // Start with full opacity until checked
                textDecorationLine: item.checked ? "line-through" : "none", // Toggle line-through
                textDecorationStyle: "solid",
                textDecorationColor: "#4CAF50",
              },
            ]}
          >
            {item.label}
          </Animated.Text>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Congrats!</Text>
            <Button title="Go to Home" onPress={closeModalAndNavigate} color="#FFC72E" />
            </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
    color: "#555",
  },
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
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
});
