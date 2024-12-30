import React, {useState, useEffect} from "react";
import { View, Button, Text, Image } from "react-native";
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

  const calculateStrikeNumber = ():number => {
    const todayPos = calculateTodayPosition(userData);
    let strikeNumber = 0;
    // console.log("daytracker", userData.dayTracker);
    for (let i = todayPos; i >= 0; i--) {
      if (userData.dayTracker[i] === 1) {
        strikeNumber++;
      } else {
        break;
      }
    }
    return strikeNumber;
  }
  
  console.log("userData", userData.startDate.toDate());

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userData?.photo && (
        <Image
          source={{ uri: userData.photo }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      )}
      <Text>Name: {userData?.name ?? "Unknown User"}</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>
        Join Date: {userData?.joinDate
          ? new Date(userData.joinDate.seconds * 1000).toLocaleString()
          : "N/A"}
      </Text>
      <Text>
        Start Date: {userData?.startDate
          ? userData.startDate.toDate().toLocaleString()
          : "Not set"}
      
      </Text>
      <Text>Strike Number: {strikeNumber}</Text>
      {/* <Button title="Calculate Today Position" onPress={calculateTodayPosition}></Button> */}

      <Button title="reset date" onPress={resetDate}></Button>
      <Button title="Log Out" onPress={onLogout} />

    </View>
  );
};

export default SettingsScreen;
