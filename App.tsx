import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import AuthStack from "./navigation/AuthStack";
import MainTabs from "./navigation/MainTabs";
import { createUser, getUser } from "./services/firebaseUserService";
import { MainTabsParamList } from "./navigation/MainTabs";

export default function App() {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);
  const [userData, setUserData] = useState<any | null>(null); // from firestore
  const [initialRoute, setInitialRoute] = useState<string>("Home");

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
      console.log("User signed in:", user.data.user);
      let firebaseUser = await getUser(user.data.user.id);
      console.log("firebaseUser Fetched", firebaseUser);
      if (firebaseUser == null){
        firebaseUser = await createUser(user.data.user.id, {
          name: user.data.user.name || "NA",
          email: user.data.user.email,
          photo: user.data.user.photo || "",
        });
        setInitialRoute("SetStartDate");
        console.log("initialRoute", initialRoute);
      }

      setUserData(firebaseUser);
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
        <MainTabs 
          onLogout={handleLogout} 
          userData={userData}
          initialRoute={initialRoute as keyof MainTabsParamList}
        />
      ) : (
        <AuthStack onSignin={handleSignin} />
      )}
    </NavigationContainer>
  );
}
