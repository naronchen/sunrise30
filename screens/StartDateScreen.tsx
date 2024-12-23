import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainTabsParamList } from '../navigation/MainTabs';

const StartDateScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const route = useRoute();
  const { userData } = route.params as MainTabsParamList['SetStartDate'];

  console.log('userData at startDate:', userData);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting on the morning of</Text>
      <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
        dividerColor="#FFC72E"
      />
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
