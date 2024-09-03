import { tsNamedTupleMember } from '@babel/types';
import { join } from 'path';
import React, {useEffect, useState, useCallback} from 'react'
import { Text, View, StyleSheet,Dimensions, Image, Button, TouchableOpacity } from 'react-native';
import RectangularProgressBar from '@/components/progressBar';
import supabase from '@/components/supabase';
import { useFetchData } from '@/hooks/useFetchData';
import useAuthStatus  from "@/hooks/useAuthStatus";
import { useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import calendar from './calendar';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useFocusEffect } from '@react-navigation/native';


const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
}

export default function settings() {
  
  const user  = useAuthStatus();
  // const startDate:Date = new Date(data[0].startDate);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const calculateDatePosition = (startDate: Date) => {
    const today:Date = new Date();
    const differenceInMilliseconds = today.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  // const todayPosition = calculateDatePosition(new Date(data[0].startDate));
  // console.log(todayPosition)

  const [strike, setStrike] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [completedDays, setCompletedDays] = useState(0);
  const [joinDate, setJoinDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    console.log(user?.id, "user id")
    if (user?.id) {
      const { data, error } = await supabase
        .from('data')
        .select('startDate, calendar_track, joinDate')
        .eq('user_id', user.id);
      if (error) {
        setError(error);
      } else {
        setData(data);
        console.log(data, "data set")
        setCompletedDays(data[0].calendar_track.reduce((acc:number, curr:number) => acc + curr, 0));
        setStartDate(data[0].startDate);
        setStrikeNumber(new Date(data[0].startDate), data[0].calendar_track);
        setJoinDate(data[0].joinDate);
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchData();
      }
    }, [user])
  );

  // async update start Date!!!

  useEffect(() => {
    if (data.length == 0){
      fetchData();
    }
  }, [user?.id, data]);

  const setStrikeNumber = (_startDate: Date, calendar_data:Number[]) => {
    const todayPosition = calculateDatePosition(_startDate);
    console.log(todayPosition, "today position")
    // starting at todayPositionm, loop backwards to check calendar_track strike
    let strike = 0;
    for (let i = todayPosition; i >= 0; i--) {
      if (calendar_data[i] === 1) {
        strike++;
      } else {
        break;
      }
    }
    setStrike(strike);
  }



  return (
    <View style={styles.settingsContainer}>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../assets/images/penguine.jpg')} 
          style={styles.profilePicture} 
        />
        <Text style={styles.nameText}>
          {user?.email}
          </Text>
        <Text style={styles.joinDateText}>
          started {startDate}
        </Text>
      </View>

      <View style={styles.expContainer}>
        <View style = {styles.statusContainer}>
          <Image
            source={require('../../assets/images/fire.gif')}
            style={styles.fireGif}
          ></Image>
          <Text
            style={styles.streakText}
          >{strike}</Text>
        </View>
      </View>

      <View style={styles.expContainer}>
      <View style={styles.statusContainer}>
          <RectangularProgressBar
            totalRectangles={20}
            // filledRectangles={Math.floor(profileMockObject.completedDays / 30 * 20) }
            completedDays={completedDays}
            rectangleColor="#FFC72E"
            height={25}
          />
          {/* <Text>{(profileMockObject.completedDays / 30 * 100).toFixed(2)}%</Text> */}
        </View>
      </View>
      <View style ={styles.settingButtonContainer}>
        <Link href="/DateSelection" style ={styles.settingsButton}>
          <Text style={styles.settingText}>Reset Start Date</Text>
        </Link>
        <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.settingsButton}>
            <Text style={styles.settingText}>Log Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',    
    paddingVertical: '20%'
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderColor: 'grey',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  joinDateText: {
    fontSize: 15,
    color: '#BCB7B7',
  },

  expContainer:{
    flex: 1,
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
  },
  statusContainer:{
    flex: 1,
    width: '80%',
    borderWidth: 3,
    borderColor: '#D9D9D9',
    borderRadius: 10,

    marginVertical: 20,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',   
  },
  fireGif: {
    width: 60,
    height: 60,
    marginTop: -10,
    marginRight: 15,
    opacity: 0.6, 
  },
  streakText: {
    fontSize: 60,
    fontWeight: 'semibold',
    color: '#FFC72E',
  },
  settingButtonContainer: {
    display: 'flex',
    flexDirection:'row',
    gap: 10,
  },
  settingsButton:
  {
     backgroundColor: '#FFC72E', padding: 8, borderRadius: 5, marginVertical: 5 
  },
  settingText: {
    fontSize: 15, textAlign: 'center', color: 'white'
  }

});
