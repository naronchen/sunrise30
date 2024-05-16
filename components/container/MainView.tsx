import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';

type MainViewProps = {
    title?: string;             
    children?: React.ReactNode; 
    style?: ViewStyle;           
  };

export default function MainView({ title, children, style }: MainViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 25,
    marginLeft: 30,
  }
});
// todo: just center things