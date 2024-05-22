import React, { useEffect, useRef } from 'react';
import { Text, View, Pressable, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Press } from 'hammerjs';


type CheckBoxProps = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

export default function CheckBox({label, checked, onToggle}: CheckBoxProps){
  const strikeThrough = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(strikeThrough, {
      toValue: checked ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <Pressable 
        
        onPress={onToggle} 
        style={({ pressed }) => [
            styles.container,
            { opacity: pressed ? 0.5 : 1 }
          ]} 
    >
        <View style={styles.iconTextContainer}>
            <Ionicons 
                size={28}
                name={checked ? 'checkbox' : 'square-outline'}
                color={checked? '#66C2E9' : '#000'}
            />
              <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Animated.View 
                  style={[
                    styles.strikeThrough,
                    { transform: [{ scaleX: strikeThrough }] }
                  ]}
                />
              </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: { 
      paddingVertical: 15,      
    },
    iconTextContainer: {
      flexDirection: 'row', 
      marginRight: 10,    
      marginLeft: 30,
    },
    textContainer: {
      position: 'relative',
    },
    label: {
      marginLeft: 10,
      fontSize: 22,          
    },
    strikeThrough: {
      position: 'absolute',
      height: 2,
      backgroundColor: '#000',
      top: '50%',
      left: 0,
      right: 0,
      transformOrigin: 'left center',
    },
});