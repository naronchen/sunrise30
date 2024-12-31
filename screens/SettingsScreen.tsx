import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { navigationRef } from "../navigation/navRef";
import { calculateTodayPosition } from "../services/firebaseUserService";

const SettingsScreen = ({ onLogout, userData, updateUserData }: { onLogout: () => void; userData: any; updateUserData: (newData: any) => void }) => {
  const [strikeNumber, setStrikeNumber] = useState(0);

  useEffect(() => {
    setStrikeNumber(calculateStrikeNumber());
  }, [userData]);

  const resetDate = () => {
    navigationRef.navigate("StartDate", { onLogout, userData, updateUserData });
  };

  const calculateStrikeNumber = (): number => {
    const todayPos = calculateTodayPosition(userData);
    let strikeNumber = 0;
    for (let i = todayPos; i >= 0; i--) {
      if (userData.dayTracker[i] === 1) {
        strikeNumber++;
      } else {
        break;
      }
    }
    return strikeNumber;
  };

  return (
    <View style={styles.settingsContainer}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={
            userData?.photo
              ? { uri: userData.photo }
              : require('../assets/penguine.jpg') // Fallback image
          }
          style={styles.profilePicture}
        />
        <Text style={styles.nameText}>{userData?.name ?? "Unknown User"}</Text>

        <Text style={styles.joinDateText}>
          Join Date:{" "}
          {userData?.joinDate
            ? new Date(userData.joinDate.seconds * 1000).toLocaleDateString()
            : "N/A"}
        </Text>

        <Text style={styles.joinDateText}>
          Started Challenge:{" "}
          {userData?.startDate
            ? userData.startDate.toDate().toLocaleDateString()
            : "Not Set"}
        </Text>
      </View>

      

      {/* Streak Section */}
      <View style={styles.expContainer}>
        <View style={styles.statusContainer}>
          <Image
            source={require("../assets/fire.gif")}
            style={styles.fireGif}
          />
          <Text style={styles.streakText}>{strikeNumber}</Text>
        </View>
      </View>
      

      {/* Progress Bar Section */}
      <View style={styles.expContainer}>
        <View style={styles.statusContainer}>
          {/* Add your progress bar component */}
          <Text>{`Completed Days: ${
            userData.dayTracker.filter((day: number) => day === 1).length
          }`}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.settingButtonContainer}>
        <TouchableOpacity
          onPress={resetDate}
          style={styles.settingsButton}
        >
          <Text style={styles.settingText}>Reset Start Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLogout}
          style={styles.settingsButton}
        >
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingVertical: "20%",
  },
  profileContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "lightgrey",
    borderWidth: 2,
    borderColor: "grey",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  joinDateText: {
    fontSize: 15,
    color: "#BCB7B7",
  },
  expContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    flex: 1,
    width: "80%",
    borderWidth: 3,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fireGif: {
    width: 60,
    height: 60,
    marginTop: -10,
    marginRight: 15,
    opacity: 0.6,
  },
  streakText: {
    fontSize: 60,
    fontWeight: "semibold",
    color: "#FFC72E",
  },
  settingButtonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  settingsButton: {
    backgroundColor: "#FFC72E",
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  settingText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
});

export default SettingsScreen;
