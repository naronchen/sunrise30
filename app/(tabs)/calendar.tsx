import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Calendar from '@/components/calendarView.tsx/Calendar';
import MainView from '@/components/container/MainView';

export default function calendar() {
  return (
    <MainView title="" style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Calendar />
      </SafeAreaView>
    </MainView>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    },
});