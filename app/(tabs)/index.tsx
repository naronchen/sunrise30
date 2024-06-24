import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import MainView from '@/components/container/MainView';
import CheckBox from '@/components/todayView/CheckBox';
import CompletionModal from '@/components/CompletionModal';
import supabase from '@/components/supabase';
import useAuthStatus from '@/hooks/useAuthStatus';



export default function dayView() {

  const user  = useAuthStatus();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDoneToday, setIsDoneToday] = useState(false);

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

    if (newCheckItems.every(item => item.checked)) {
      finishedToday();
      setModalVisible(true);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchTodayCompletionStatus();
    }
  }, [user?.id, isModalVisible]);

  const fetchTodayCompletionStatus = async () => {
    
    const { data, error } = await supabase
      .from('data')
      .select('calendar_track, startDate')
      .eq('user_id', user?.id);

    if (error) {
      console.error('Error fetching today completion status:', error);
    } else if (data && data.length > 0) {
      const startDate = new Date(data[0].startDate);
      const differenceInDays = calculateDatePosition(startDate);
      console.log("difference in days", differenceInDays);
      setIsDoneToday(data[0].calendar_track[differenceInDays] === 1);
    }
  };

  const calculateDatePosition = (startDate: Date) => {
    const today:Date = new Date();
    const differenceInMilliseconds = today.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  const finishedToday = async () => {
   

    const {data, error} = await supabase
      .from('data')
      .select('calendar_track, startDate')
      .eq('user_id', user?.id)

    if (error) {
      console.error('Error fetching calendar data:', error)
    } else {
      const startDate:Date = new Date(data[0].startDate);
      const differenceInDays = calculateDatePosition(startDate);
      
      const calendarData = data[0].calendar_track;
      calendarData[differenceInDays] = 1;
      const {data: insertData, error: insertError} = await supabase
        .from('data')
        .update({calendar_track: calendarData, isDoneToday: true})
        .eq('user_id', user?.id)
  }}

  return (
  <MainView title="">
    <View>
      {
        isDoneToday ? (
          <Text style={styles.doneText}>You are done!</Text>
        ) : (
          checkItems.map((item, index) => (
            <CheckBox
              key={index}
              label={item.label}
              checked={item.checked}
              onToggle={() => handleToggle(index)}
            />
          ))
        )
      }

      <CompletionModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  </MainView>

  )
}

const styles = StyleSheet.create({
  todayContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});