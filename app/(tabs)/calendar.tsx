import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Calendar from '@/components/calendarView.tsx/Calendar';
import MainView from '@/components/container/MainView';

export default function calendar() {
  return (
    <MainView title="Calendar">
      <SafeAreaView style={{ flex: 1 }}>
        <Calendar />
      </SafeAreaView>
    </MainView>
      )
}
