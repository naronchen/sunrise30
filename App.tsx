import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import AuthStack from "./navigation/AuthStack";
import MainTabs from "./navigation/MainTabs";
import { getOrCreateUser } from "./services/firebaseUserService";

export default function App() {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);
  const [userData, setUserData] = useState<any | null>(null); // from firestore

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


  const handleSignin = async (user: SignInResponse) => {
    if (isSignInSuccessResponse(user)) {
      setUserInfo(user);

      const firestoreUser = await getOrCreateUser(user.data.user.id, {
        name: user.data.user.name || "NA",
        email: user.data.user.email,
        photo: user.data.user.photo || "",
      });

      setUserData(firestoreUser);
      
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
        <MainTabs onLogout={handleLogout} userData={userData}/>
      ) : (
        <AuthStack onSignin={handleSignin} />
      )}
    </NavigationContainer>
  );
}
