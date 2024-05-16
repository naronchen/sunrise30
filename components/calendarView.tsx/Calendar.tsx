import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Calendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <View key={i} style={styles.dayContainer}>
          <Text style={styles.dayText}>{i}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        {days}
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Layout children in a row
      flexWrap: 'wrap',    
      padding: 10,
    },
    dayContainer: {
      width: Dimensions.get('window').width / 6, // Divide the screen width by 7
      height: 70, // Set a fixed height for each day container
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
    },
    dayText: {
      fontSize: 17,
    }
  });
  

    export default Calendar;
