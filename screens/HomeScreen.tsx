import React from "react";
import { View, Text } from "react-native";

const HomeScreen = ({ userData }:{ userData: any}) => {
  console.log("userDataTracker", userData?.dayTracker);
  return (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home Screen</Text>
    <Text>{userData?.dayTracker}</Text>
  </View>
  );
};

export default HomeScreen;
