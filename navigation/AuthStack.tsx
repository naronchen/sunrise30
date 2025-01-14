import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleSignInButton from "../components/GoogleSignInButton";

const Stack = createStackNavigator();

const AuthStack = ({ onSignin }: { onSignin: (user: any) => void }) => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn" options={{ headerShown: false }}>
      {() => (
        <View style={styles.container}>
          <Text>Welcome :)</Text>
          <GoogleSignInButton onSignin={onSignin} />
        </View>
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Set a background color
  },
});

export default AuthStack;
