import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AdminTabsLayout() {
    return (
        <Tabs initialRouteName="dashboard" screenOptions={{
        headerTitleStyle: {fontWeight: "900"},
        tabBarLabelStyle: {fontSize: 11},
        }}
        >
            
        <Tabs.Screen name="dashboard" 
        options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ size, color }) =>  ( <Ionicons name="speedometer-outline" size={size} color={color} />
            ),
        }}
        />

      
        <Tabs.Screen name="lost"
        options={{
           title: "Hilang", 
        }} 
        />




        </Tabs>


    );
}