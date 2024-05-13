import React, { useState } from 'react'
import { Text } from 'react-native';
import MainView from '@/components/container/MainView';
import CheckBox from '@/components/todayView/CheckBox';

export default function dayView() {

  const [checkItems, setCheckItems] = useState([
    {label: 'Silence - Meditation', checked: false},
    {label: 'Affirmation', checked: false},
    {label: 'Visualization', checked: false},
    {label: 'Exercise', checked: false},
    {label: 'Reading', checked: false},
    {label: 'Scribing', checked: false},
  ]);

  const handleToggle = (index: number) => {
    const newCheckItems = [...checkItems];
    newCheckItems[index].checked = !newCheckItems[index].checked;
    setCheckItems(newCheckItems);
  }

  return (
    <MainView title="Day 1">
      {checkItems.map((item, index) => (
        <CheckBox
          key={index}
          label={item.label}
          checked={item.checked}
          onToggle={() => handleToggle(index)}
        />
      ))}
      <Text>dayView</Text>
    </MainView>
  )
}
