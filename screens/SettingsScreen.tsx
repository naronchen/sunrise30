import React from "react";
import { View, Button, Text, Image } from "react-native";

const SettingsScreen = ({ onLogout, userData }: { onLogout: () => void; userData: any }) => {
  // console.log("userData", userData);
  console.log(userData?.joinDate)
  const today = new Date();
  console.log("today time", today.getTime());
  console.log("join Date time", userData?.joinDate?.seconds);
  if (!isNaN(userData?.joinDate)) { // Check if joinDate is valid
    const differenceInMilliseconds = today.getTime() - userData.joinDate.seconds*1000; 
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); 
    
    console.log("number of hours passed since joined", differenceInMilliseconds / (1000 * 60 * 60));
    console.log(`Difference in milliseconds: ${differenceInMilliseconds}`);
    console.log(`Difference in days: ${differenceInDays}`);

  } else { 
      console.error('Invalid joinDate format:', userData?.joinDate);
  }

  

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
      <Button title="Log Out" onPress={onLogout} />
    </View>
  );
};

export default SettingsScreen;
