import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define props interface if any props are expected
interface CalendarProps {
  calendarData: number[]; // Assuming calendarData is an array of numbers
}

const Calendar: React.FC<CalendarProps> = ({ calendarData }) => {
  const totalDays = 30;
  const daysPerRow = 5;
  const numRows = Math.ceil(totalDays / daysPerRow);
  const days = [];

  for (let i = 1; i <= numRows; i++) {
    const rowDays = [];
    for (let j = (i - 1) * daysPerRow + 1; j <= i * daysPerRow && j <= totalDays; j++) {
      const dayIndex = j - 1; // zero-indexed to match the calendarData array
      const isMarked = calendarData[dayIndex] === 1;
      rowDays.push(
        <View key={j} style={styles.dayContainer}>
          <View style={[styles.circle, isMarked ? styles.markedDay : undefined]}>
            <Text style={styles.dayText}>{j}</Text>
          </View>
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
    flexDirection: 'row',  
    justifyContent: 'space-evenly', 
    marginBottom: 5,
  },
  dayContainer: {
    height: 70,  
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: 17,
  },
  circle: {
    width: 40,   // Width for the circle
    height: 40,  // Height for the circle
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,  
  },
  markedDay: {
    backgroundColor: '#FFC72E',
  }
});

export default Calendar;
