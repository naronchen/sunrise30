import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';

interface RectangularProgressBarProps {
    totalRectangles: number;
    completedDays: number;
    rectangleColor?: string;
    height?: number;
  }
  

const RectangularProgressBar: React.FC<RectangularProgressBarProps> = ({
  totalRectangles,
  completedDays,
  rectangleColor = '#FFC72E',
  height = 20,
}) => {
    
  const filledRectangles = Math.floor(completedDays / 30 * totalRectangles) 
  const rectangles = [];
  const progressPercentage = Math.round((completedDays / 30) * 100);

  for (let i = 0; i < totalRectangles; i++) {
    rectangles.push(
      <View
        key={i}
        style={[
          styles.rectangle,
          {
            backgroundColor: i < filledRectangles ? rectangleColor : '',
            height,
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      {rectangles}
      {filledRectangles > 0 && (
        <View style={[styles.tooltip, { left: `${(filledRectangles / totalRectangles) * 100}%` }]}>
          <Text style={styles.tooltipText}>{`${progressPercentage}%`}</Text>
          <View style={styles.triangle} /> 
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between', 
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFC72E',
    padding: 5,
    
  },
  rectangle: {
    flex: 1, // This ensures the rectangles share the space equally
    margin: 2, // Adjust the spacing between rectangles
  },

  tooltip: {
    position: 'absolute',
    top: -45, // Adjust based on your visual needs
    transform: [{ translateX: -20 }], // Adjust to center tooltip above the current rectangle
    backgroundColor: '#FFC72E',
    padding: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: 'white',
    fontSize: 18,
  },
  triangle: {
    position: 'absolute',
    top: 30, // Adjust this value to position the triangle above the tooltip
    left: '50%', // Center under the tooltip
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8, // Make the top border wider to create an upward arrow
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFC72E', // Match tooltip background color
    transform: [{ translateX: -5 }], // Center the triangle horizontally
  }
});

export default RectangularProgressBar;
