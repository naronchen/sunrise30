import React from 'react'
import { Text, View, Switch } from 'react-native';

type CheckBoxProps = {
    label: string;
    checked: boolean;
    onToggle: () => void;
};

export default function CheckBox({label, checked, onToggle}: CheckBoxProps){
  return (
    <View>
      <Switch value={checked} onValueChange={onToggle} />
        <Text>{label}</Text>
    </View>
  )
}
