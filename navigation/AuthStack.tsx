import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleSignInButton from "../components/GoogleSignInButton";

const Stack = createStackNavigator();

const AuthStack = ({ onSignin }: { onSignin: (user: any) => void }) => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn" options={{ headerShown: false }}>
      {() => <GoogleSignInButton onSignin={onSignin} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthStack;
