import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import supabase from '@/components/supabase'; // Adjust the import path according to your setup

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // I turned off Confirm Email
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    setLoading(false);
    if (error) Alert.alert("Signup Error", error.message);
    else Alert.alert("Success", 'Sign up successful, check your email to confirm!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#5599bb' : '#66C2E9' }
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign Up"}</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
    },
    input: {
      width: '100%',
      marginVertical: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
    button: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
  });

export default SignupPage;
