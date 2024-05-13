import React from 'react'
import { Text, View, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type CheckBoxProps = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

export default function CheckBox({label, checked, onToggle}: CheckBoxProps){
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onToggle} style={styles.iconContainer}>
            <Ionicons 
                size={24}
                name={checked ? 'checkbox' : 'square-outline'}
            />
                <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { 
      marginBottom: 10       
    },
    iconContainer: {
      flexDirection: 'row', 
      marginRight: 10,    
    },
    label: {
        marginLeft: 10,
      fontSize: 20,          
    }
  });