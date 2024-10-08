import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Alert } from 'react-native';
import MainView from '@/components/container/MainView';
import CheckBox from '@/components/todayView/CheckBox';
import CompletionModal from '@/components/CompletionModal';
import supabase from '@/components/supabase';
import useAuthStatus from '@/hooks/useAuthStatus';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useFetchData } from '@/hooks/useFetchData';


export default function dayView() {
  const user  = useAuthStatus();
  const [data, setData] = useState<any[]>([]);
  
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
  const fetchData = async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from('data')
        .select('startDate, calendar_track, joinDate')
        .eq('user_id', user.id);
      if (error) {
        console.error('Error fetching calendar data:', error)
      }
      else {
        console.log(data, "data set | task page" )
        const startDate = new Date(data[0].startDate);
        const differenceInDays = calculateDatePosition(startDate);
        setIsDoneToday(data[0].calendar_track[differenceInDays] === 1);
      }
    }
  };

  useEffect(() => {
    if (data.length == 0){
      fetchData();
    }
  }, [user?.id, data]);

  const calculateDatePosition = (startDate: Date) => {
    const today:Date = new Date();
    console.log(startDate, "start date", today, "today", "| task page")
    const differenceInMilliseconds = today.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    console.log(differenceInDays, "diff in days", "| task page")
    return differenceInDays;
  }

  const finishedToday = async () => {
    if (error) {
      console.error('Error fetching calendar data:', error)
    } else {
      const startDate:Date = new Date(data[0].startDate);
      const differenceInDays = calculateDatePosition(startDate);
      
      const calendarData = data[0].calendar_track;
      if (differenceInDays < 30 && differenceInDays >= 0) {
        calendarData[differenceInDays] = 1;
      } else {
        Alert.alert("Just updated ay that is not in the 30-day range from startDate");
      }
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
            <View style={styles.doneContainer}>
              <TabBarIcon name='checkmark-circle' style={styles.doneIcon} />
              {/* <Text style={styles.doneText}>You've completed today's tasks!</Text> */}
            </View>
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
  // doneText: {
  //   marginTop: 20,
  //   fontSize: 18,
  //   color: 'green',
  // },
  doneContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneIcon: {
    fontSize: 100,
    color: '#66C2E9',
  },
});