import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";

import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { GlobalStyles } from './constants/styles';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const colors = GlobalStyles.colors;

function BottomTabNavigator(){
  return(
      <BottomTab.Navigator 
        screenOptions={({navigation})=>({
          headerStyle:{
            backgroundColor: colors.primary500,
          },
          headerTintColor: 'white',
          tabBarStyle:{
            backgroundColor: colors.primary500
          },
          tabBarActiveTintColor: colors.accent500,
          headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('Manage');
            }}
          />
        ),
        })}
        >
        <BottomTab.Screen 
          name="All" 
          component={AllExpenses} 
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon:  ({color,size}) => (<Ionicons name='calendar' color={color} size={size}/> ),
        }} />
        <BottomTab.Screen 
          name="Recent" 
          component={RecentExpenses} 
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent Expenses",
            tabBarIcon: ({color,size}) => (<Ionicons name='hourglass' color={color} size={size}/> ),
        }} />
      </BottomTab.Navigator>
  );
};


export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              headerStyle:{
                backgroundColor: colors.primary500,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen 
                name='All Expenses' 
                component={BottomTabNavigator} 
                options={{
                  headerShown: false
                }}
              />
            <Stack.Screen 
                name='Manage' 
                component={ManageExpenses} 
                options={{
                  title: "Manage Expense",
                  presentation: "modal"
                }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

