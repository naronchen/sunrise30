import { tsNamedTupleMember } from '@babel/types';
import { join } from 'path';
import React from 'react'
import { Text, View, StyleSheet,Dimensions, Image } from 'react-native';
import RectangularProgressBar from '@/components/progressBar';

const profileMockObject = {
  name: 'Naron',
  joinDate: '2024 May 14',
  profilePicture: '../../assets/images/penguine.jpg',
  strikeNumber: 3,
  completedDays: 5,
}


export default function settings() {
  return (
    <View style={styles.settingsContainer}>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../assets/images/penguine.jpg')} 
          style={styles.profilePicture} 
        />
        <Text style={styles.nameText}>
          {profileMockObject.name}
          </Text>
        <Text style={styles.joinDateText}>
          Joined {profileMockObject.joinDate}
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
          >{profileMockObject.strikeNumber}</Text>
        </View>
      </View>

      <View style={styles.expContainer}>
      <View style={styles.statusContainer}>
          <RectangularProgressBar
            totalRectangles={20}
            // filledRectangles={Math.floor(profileMockObject.completedDays / 30 * 20) }
            completedDays={profileMockObject.completedDays}


            rectangleColor="#FFC72E"
            height={25}
          />
          {/* <Text>{(profileMockObject.completedDays / 30 * 100).toFixed(2)}%</Text> */}
        </View>
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

});
