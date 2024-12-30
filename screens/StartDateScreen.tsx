import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { navigationRef } from '../navigation/navRef';
import firestore from '@react-native-firebase/firestore';

const StartDateScreen = ({ onLogout, userData, updateUserData }: { onLogout: () => void; userData: any;         updateUserData: (newData: any) => void
}) => {
  const [date, setDate] = useState(new Date());

  const saveDate = () => {
    console.log('Date:', date);
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    // cant set a date in the past
    if (selectedDate.getTime() < today.getTime()) {
      alert('Please select a date in the future');
      return;
    }
    // @todo: user can move startDate and keep the record if date is in the past
    const userRef = firestore().collection('users').doc(userData.id);
    userRef.set({ startDate: date }, { merge: true });
    const tracker = Array(30).fill(0);
    userRef.update({ dayTracker: tracker });
    const updatedUserData = { ...userData,dayTracker: tracker, startDate: firestore.Timestamp.fromDate(date) 
 };
    updateUserData(updatedUserData);
    navigationRef.navigate('MainTabs', { onLogout, userData: updatedUserData, updateUserData });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting on the morning of</Text>
      <Text> this will reset all records</Text>
      <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
        dividerColor="#FFC72E"
      />
      <Button
        title = 'save'
        onPress = {saveDate}
        >
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFC72E', 
  },
});

export default StartDateScreen;
