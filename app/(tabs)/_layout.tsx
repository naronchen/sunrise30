import React from 'react'
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#66C2E9',
            headerShown: false,
            tabBarStyle: {
                height: 70,
                paddingBottom: 1,
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: '',
                tabBarIcon: ({focused}) => (
                    <TabBarIcon 
                        name='today-outline' 
                        focused={focused}
                    />
                )
            }}
        />
        
        <Tabs.Screen
            name="calendar"
            options={{
                title: '',
                tabBarIcon: ({focused}) => (
                    <TabBarIcon 
                        name='calendar-outline' 
                        focused={focused}
                    />
                )
            }}
        />

        <Tabs.Screen
            name="settings"
            options={{
                title: '',
                tabBarIcon: ({focused}) => (
                    <TabBarIcon 
                        name='settings-outline' 
                        focused={focused}
                    />
                )
            }}
        />

    </Tabs>
  )
}
