import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import DetailsScreen from '../screen/DetailsScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})