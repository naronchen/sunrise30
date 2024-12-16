import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, SignInResponse } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";



export default function App() {

  const [error, setError] = useState<Error>();
  const [userInfo, setUserInfo] = useState<SignInResponse | null>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '327743443531-29og1qjg43uv056oo9i2kkiifsnq6hqa.apps.googleusercontent.com', 
    });
  })

  const signin = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e);
        setError(e);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    }
  }

  const logout = () => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>{JSON.stringify(error)}</Text> */}
      {/* {userInfo && <Text>{
        JSON.stringify(userInfo)
        }</Text>
        } */}
      {userInfo ? (
        <Button title="LogOut" onPress={logout} />
      ) : (
        <GoogleSigninButton onPress={signin} color={GoogleSigninButton.Color.Dark} />
      )}
    </View>
  );
}
