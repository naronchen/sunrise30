import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabs from "./MainTabs";
import StartDateScreen from "../screens/StartDateScreen";

export type RootStackParamList = {
    MainTabs: { onLogout: () => void; userData: any; updateUserData: (newData: any) => void };
    StartDate: { onLogout: () => void; userData: any; updateUserData: (newData: any) => void };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = ({
        userData, 
        onLogout, 
        updateUserData
    }: { 
        userData: any; 
        onLogout: () => void; 
        updateUserData: (newData: any) => void
    }) => (
    <Stack.Navigator initialRouteName={ 'MainTabs' }>
        <Stack.Screen name = "MainTabs" options={{ headerShown: false }}>
            {() => <MainTabs onLogout={onLogout} userData={userData} updateUserData={updateUserData}/>}
        </Stack.Screen>
        {/* <Stack.Screen name="StartDate" component={StartDateScreen} /> */}
        <Stack.Screen name="StartDate">
            {() => <StartDateScreen onLogout={onLogout} userData={userData} updateUserData={updateUserData} />}
        </Stack.Screen>
    </Stack.Navigator>
);

export default RootStack;