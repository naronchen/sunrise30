import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ToDoScreen from "../screens/ToDoScreen";

export type MainTabsParamList = {
  ToDo: undefined;
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = ({ onLogout, userData, updateUserData }: { 
  onLogout: () => void; 
  userData: any;
  updateUserData: (newData: any) => void
}) => (
    <Tab.Navigator>
    {/* ToDo Screen */}
    <Tab.Screen name="ToDo">
      {() => <ToDoScreen userData={userData} updateUserData={updateUserData} />}
    </Tab.Screen>

    {/* Home Screen */}
    <Tab.Screen name="Home">
      {() => <HomeScreen userData={userData} />}
    </Tab.Screen>

    {/* Settings Screen */}
    <Tab.Screen name="Settings">
      {() => <SettingsScreen 
        onLogout={onLogout} 
        userData={userData} 
        updateUserData={updateUserData}
      />}
    </Tab.Screen>

  </Tab.Navigator>

);

export default MainTabs;
