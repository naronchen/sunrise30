import React from 'react'
import { Text, View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Press } from 'hammerjs';


type CheckBoxProps = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

export default function CheckBox({label, checked, onToggle}: CheckBoxProps){
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
                <Text style={styles.label}>{label}</Text>
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
    label: {
        marginLeft: 10,
      fontSize: 22,          
    }
  });