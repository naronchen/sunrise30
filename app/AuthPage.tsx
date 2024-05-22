import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import supabase from '@/components/supabase'; // Adjust the import path according to your setup

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) alert(error.message);
    // else alert('Logged in!');
  };

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    setLoading(false);
    if (error) alert(error.message);
    else alert('Sign up successful, check your email to confirm!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Page</Text>
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
      <Button title={loading ? "Loading..." : "Log In"} onPress={handleLogin} disabled={loading} />
      <Button title={loading ? "Loading..." : "Sign Up"} onPress={handleSignup} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});
