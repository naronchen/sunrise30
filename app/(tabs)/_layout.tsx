import React from 'react'
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#66C2E9',
            headerShown: false,
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Today',
            }}
        />
        
        <Tabs.Screen
            name="calendar"
            options={{
                title: 'Calendar',
            }}
        />

        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
            }}
        />

    </Tabs>
  )
}
