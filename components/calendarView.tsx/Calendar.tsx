import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Calendar = () => {
  const totalDays = 30;
  const daysPerRow = 5;
  const numRows = Math.ceil(totalDays / daysPerRow);
  const days = [];

  for (let i = 1; i <= numRows; i++) {
    const rowDays = [];
    for (let j = (i - 1) * daysPerRow + 1; j <= i * daysPerRow && j <= totalDays; j++) {
      rowDays.push(
        <View key={j} style={styles.dayContainer}>
          <Text style={styles.dayText}>{j}</Text>
        </View>
      );
    }
    days.push(
      <View key={i} style={styles.rowContainer}>
        {rowDays}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {days}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',  
      flexWrap: 'wrap',
      padding: 10,
    },
    rowContainer: {
      flexDirection: 'row',  // Layout days in a row
      justifyContent: 'space-evenly', 
      marginBottom: 5, // Space between rows
    },
    dayContainer: {
      height: 70,  
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,  // Allow flex to automatically adjust the width
    },
    dayText: {
      fontSize: 17,
    }
  });

export default Calendar;
  