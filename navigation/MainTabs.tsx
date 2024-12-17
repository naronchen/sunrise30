import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ToDoScreen from "../screens/ToDoScreen";

const Tab = createBottomTabNavigator();

const MainTabs = ({ onLogout, userData }: { onLogout: () => void; userData: any }) => (
  <Tab.Navigator>
    <Tab.Screen name="ToDo" component={ToDoScreen} />
    <Tab.Screen name="Home">
      {() => <HomeScreen userData={userData} />}
    </Tab.Screen>
    <Tab.Screen name="Settings" >
      {() => <SettingsScreen onLogout={onLogout} userData={userData}/>}
    </Tab.Screen>
  </Tab.Navigator>
);

export default MainTabs;
