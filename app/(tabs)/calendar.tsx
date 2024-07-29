import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Calendar from '@/components/calendarView.tsx/Calendar';
import MainView from '@/components/container/MainView';
import supabase from '@/components/supabase';
import useAuthStatus from '@/hooks/useAuthStatus';

export default function calendar() {
  const [calendarData, setCalendarData] = useState<number[]>([])
  const user  = useAuthStatus();

  useEffect(() => {
    const fetchCalendarData = async () => {
      const { data, error } = await supabase
        .from('data')
        .select('calendar_track, startDate')
        .eq('user_id', user?.id)

      if (error) {
        console.error('Error fetching calendar data:', error)
      } else {
        if (data.length == 0){
          const calendar_data = new Array(30).fill(0);
          const {data: insertData, error: insertError} = await supabase
            .from('data')
            .insert([{user_id: user?.id, calendar_track: calendar_data, startDate: new Date()}])
          setCalendarData(calendar_data)
        }
        else {
          console.log(data[0].calendar_track)
          setCalendarData(data[0].calendar_track)
          
          const currentTime = new Date().setHours(-4, 0, 0, 0);

          const diffInMs = currentTime - new Date(data[0].startDate).getTime();
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          if (diffInDays > 30){
            console.log("resetting calendar")
          }
        }
      }
    }
    if (user && user.id) {
      fetchCalendarData();
    }
  }, [user?.id]) 

  return (
    <MainView title="" style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Calendar calendarData={calendarData}/>
      </SafeAreaView>
    </MainView>
      )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    },
});