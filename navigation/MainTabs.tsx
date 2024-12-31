import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";

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
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#66C2E9", // Active tab color
      headerShown: false,              // Hide header
      tabBarShowLabel: false,          // Hide tab titles under icons
    }}
  >
    {/* ToDo Screen */}
    <Tab.Screen 
      name="ToDo" 
      options={{
        title: "Today's Task",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon 
            name="checkmark-circle-outline" // Icon for ToDo screen
            focused={focused}
            style={{ fontSize: 28 }}
          />
        ),
      }}
    >
      {() => <ToDoScreen userData={userData} updateUserData={updateUserData} />}
    </Tab.Screen>

    {/* Home Screen */}
    <Tab.Screen 
      name="Home" 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon 
            name="home-outline" // Icon for Home screen
            focused={focused}
            style={{ fontSize: 28 }}
          />
        ),
      }}
    >
      {() => <HomeScreen userData={userData} />}
    </Tab.Screen>

    {/* Settings Screen */}
    <Tab.Screen 
      name="Settings" 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon 
            name="settings-outline" // Icon for Settings screen
            focused={focused}
            style={{ fontSize: 28 }}
          />
        ),
      }}
    >
      {() => (
        <SettingsScreen 
          onLogout={onLogout} 
          userData={userData} 
          updateUserData={updateUserData}
        />
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default MainTabs;
