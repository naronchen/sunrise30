import React from "react";
import { View, Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
