import React from "react";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

const GoogleSignInButton = ({ onSignin }: { onSignin: (user: any) => void }) => {
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      onSignin(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleSigninButton
      onPress={handleSignIn}
      color={GoogleSigninButton.Color.Dark}
    />
  );
};

export default GoogleSignInButton;
