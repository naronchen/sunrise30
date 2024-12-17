import React from "react";
import { View, Button, Text, Image } from "react-native";

const SettingsScreen = ({ onLogout, userData }: { onLogout: () => void; userData: any }) => {
  // console.log("userData", userData.dayTracker);
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
