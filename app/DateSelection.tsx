import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthPage from './AuthPage';
import supabase from '@/components/supabase';
import useAuthStatus from '@/hooks/useAuthStatus';
import { useFetchData } from '@/hooks/useFetchData';

const DateSelection: React.FC = () => {
  const user = useAuthStatus();
  const { data, error, loading } = useFetchData('your_table_name', 'startDate'); // Adjust table and column name
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

    const { error } = await supabase
      .from('data') // Adjust table name
      .update({ startDate: selectedDate }) // Store as Date object
      .eq('user_id', user.id);

    if (error) {
      Alert.alert("Error updating date", error.message);
    } else {
      Alert.alert("Date updated successfully");
    }
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Date</Text>

      <Button title="Select Date" onPress={() => setShow(true)} />
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

      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default DateSelection;
