import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import AuthStack from "./navigation/AuthStack";
import MainTabs from "./navigation/MainTabs";

export default function App() {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "327743443531-29og1qjg43uv056oo9i2kkiifsnq6hqa.apps.googleusercontent.com",
    });
  }, []);

  const isSignInSuccessResponse = (response: SignInResponse): response is SignInSuccessResponse => {
    return (
      response &&
      response.data !== null && 
      "user" in response.data
    );
  };
  

  const handleSignin = (user: SignInResponse) => {
    if (isSignInSuccessResponse(user)) {
      setUserInfo(user);
    } else {
      console.error("Invalid response: Not a SignInSuccessResponse");
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
  };

  return (
    <NavigationContainer>
      {userInfo ? (
        <MainTabs onLogout={handleLogout} userData={userInfo.data.user}/>
      ) : (
        <AuthStack onSignin={handleSignin} />
      )}
    </NavigationContainer>
  );
}
