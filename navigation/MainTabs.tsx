import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ToDoScreen from "../screens/ToDoScreen";
import StartDateScreen from "../screens/StartDateScreen";
import { BottomTabBar

 } from "@react-navigation/bottom-tabs";
export type MainTabsParamList = {
  SetStartDate: { userData: any };
  ToDo: undefined;
  Home: undefined;
  Settings: undefined;
};



const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = ({ onLogout, userData, initialRoute }: { onLogout: () => void; userData: any, initialRoute: keyof MainTabsParamList }) => (
  
  <Tab.Navigator
    initialRouteName={initialRoute}
    tabBar={(props) => (
      <BottomTabBar
        {...props}
        state={{
          ...props.state,
          routes: props.state.routes.filter(
            (route) => route.name !== "SetStartDate"
          ),
        }}
      />
    )}
  >
    {/* ToDo Screen */}
    <Tab.Screen name="ToDo">
      {() => <ToDoScreen userData={userData} />}
    </Tab.Screen>

    {/* Home Screen */}
    <Tab.Screen name="Home">
      {() => <HomeScreen userData={userData} />}
    </Tab.Screen>

    {/* Settings Screen */}
    <Tab.Screen name="Settings">
      {() => <SettingsScreen onLogout={onLogout} userData={userData} />}
    </Tab.Screen>

    {/* Set Start Date Screen */}
    <Tab.Screen
      name="SetStartDate"
      component={StartDateScreen}
      options={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
      initialParams = {{ userData }}
    />
  </Tab.Navigator>

);

export default MainTabs;
