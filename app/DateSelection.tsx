import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthPage from './AuthPage';
import supabase from '@/components/supabase';
import useAuthStatus from '@/hooks/useAuthStatus';
import { useFetchData } from '@/hooks/useFetchData';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
const DateSelection: React.FC = () => {
  const user = useAuthStatus();
  const { data, error, loading } = useFetchData('data', 'startDate'); // Adjust table and column name
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  if (!user) {
    return <AuthPage />;
  }

  const handleConfirm = async () => {
    if (!selectedDate) {
      Alert.alert("Please select a date");
      return;
    }

    selectedDate.setHours(-4, 0, 0, 0);

    const currentTime = new Date().setHours(-4, 0, 0, 0);
    // let diffInMs = currentTime - selectedDate.getTime();
    // let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // if (diffInDays > 30){
    //     Alert.alert("Start Date cant be more than 30 days in the past");
    //     return;
    // }
    // const startDate = new Date(data[0].startDate);
    // diffInMs = startDate.getTime() - selectedDate.getTime();
    // diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    // console.log(diffInDays, "diff in days", selectedDate, startDate)
    // if (diffInDays < 0){
    //     const calendar_data = new Array(30).fill(0);
    //     const {data: insertData, error: insertError} = await supabase
    //       .from('data')
    //       .update({calendar_track: calendar_data})
    //       .eq('user_id', user.id)
    // } else if (diffInDays >= 0){
    //     if (Array.isArray(data) && data.length > 0 && data[0].calendar_track) {
    //         const calendar_data = data[0].calendar_track.slice(diffInDays).concat(new Array(diffInDays).fill(0));
    //         const {data: insertData, error: insertError} = await supabase
    //           .from('data')
    //           .update({calendar_track: calendar_data})
    //           .eq('user_id', user.id)
    //     }
    // }


    // const { error } = await supabase
    //   .from('data') // Adjust table name
    //   .update({ startDate: selectedDate }) // Store as Date object
    //   .eq('user_id', user.id);
    const calendar_data = new Array(30).fill(0);
    const {data: insertData, error: insertError} = await supabase
        .from('data')
        .update({calendar_track: calendar_data, startDate: selectedDate})
        .eq('user_id', user.id)



    if (error) {
      Alert.alert("Error updating date", error.message);
    } else {
      Alert.alert("Date Reset Success!" );
    }
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>

      <Pressable style={styles.settingsButton} onPress={() => setShow(true)} >
        <Text style={styles.settingText}>Select Date</Text>
      </Pressable>
      
      {show && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      
      {/* Display the selected date */}
      <Text style={styles.selectedDate}>
        Selected Date: {selectedDate.toDateString()}
      </Text>

      <Text style={styles.selectedDate}>
        Once confirmed, the record will be reset.
      </Text>

      <Pressable style={styles.settingsButton} onPress={handleConfirm} >
        <Link href="/settings"  onPress={handleConfirm}>
            <Text style={styles.settingText}>Confirm</Text>
        </Link>
      </Pressable>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: 16,
    marginVertical: 8,
  },
  settingsButton:
  {
     backgroundColor: '#FFC72E', padding: 8, borderRadius: 5, marginVertical: 5 
  },
  settingText: {
    fontSize: 15, textAlign: 'center', color: 'white'
  }
});

export default DateSelection;