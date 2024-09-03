import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import supabase from '@/components/supabase'; // Adjust the import path according to your setup
import GoogleSignInButtonComponent from '../components/auth.native'; // Adjust the import path according to your setup

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
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
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#5599bb' : '#66C2E9' },
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Log In'}</Text>
      </Pressable>
      <GoogleSignInButtonComponent />
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
  googleButton: {
    marginTop: 20,
  },
});

export default LoginPage;
