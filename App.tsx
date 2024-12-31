import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import AuthStack from "./navigation/AuthStack";
import { createUser, getUser } from "./services/firebaseUserService";
import RootStack from "./navigation/RootStack";
import { navigationRef } from "./navigation/navRef";
import auth from "@react-native-firebase/auth";

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
  
  const updateUserData = (newData: any) => {
    setUserData(newData);
  }

  const handleSignin = async (user: SignInResponse) => {
    if (isSignInSuccessResponse(user)) {

      // sign in with firebase to get the token for firestore security rules
      const { idToken } = user.data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredentials = await auth().signInWithCredential(googleCredential);
      console.log("firebasae user UID", userCredentials.user.uid);

      setUserInfo(user);
      console.log("User signed in:", user.data.user);
      
      let firebaseUser = await getUser(userCredentials.user.uid);
      console.log("firebaseUser Fetched", firebaseUser);

      if (firebaseUser == null){
        firebaseUser = await createUser(userCredentials.user.uid, {
          name: user.data.user.name || "NA",
          email: user.data.user.email,
          photo: user.data.user.photo || "",
        });

        if (navigationRef.isReady()){
          navigationRef.navigate("StartDate", {onLogout: handleLogout ,userData: firebaseUser, updateUserData: updateUserData});
        }
        console.log("New user set to true");
      }
      setUserData(firebaseUser);
      // setIsLoading(false);
    } else {
      console.error("Invalid response: Not a SignInSuccessResponse");
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {userInfo ? (
        <RootStack userData={userData} onLogout={handleLogout} updateUserData={updateUserData}/>
      ) : (
        <AuthStack onSignin={handleSignin} />
      )}
    </NavigationContainer>
  );
}
