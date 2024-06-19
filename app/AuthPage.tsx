import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const AuthPage: React.FC = () => {
  const [activePage, setActivePage] = useState<'login' | 'signup'>('login');

  const handleToggle = (page: 'login' | 'signup') => {
    setActivePage(page);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activePage === 'login' ? 'Log In' : 'Sign Up'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activePage === 'login' ? styles.buttonActive : styles.buttonInactive]}
          onPress={() => handleToggle('login')}
        >
          <Text style={activePage === 'login' ? styles.textActive : styles.textInactive}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activePage === 'signup' ? styles.buttonActive : styles.buttonInactive]}
          onPress={() => handleToggle('signup')}
        >
          <Text style={activePage === 'signup' ? styles.textActive : styles.textInactive}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {activePage === 'login' ? <LoginPage /> : <SignupPage />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,

  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonActive: {
    backgroundColor: '#FFC72E',
  },
  buttonInactive: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'transparent', // This could be 'transparent' or another suitable color.
  },
  textActive: {
    color: 'white',
  },
  textInactive: {
    color: 'black',
  },
});

export default AuthPage;
