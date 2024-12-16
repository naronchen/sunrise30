import React from "react";
import { View, Button, Text, Image } from "react-native";

const SettingsScreen = ({ onLogout, userData }: { onLogout: () => void, userData: any }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

   {userData?.photo && (
      <Image
        source={{ uri: userData.photo }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
      />
    )}
    <Text>{userData?.name}</Text>
    <Button title="Log Out" onPress={onLogout} />
  </View>
);

export default SettingsScreen;
