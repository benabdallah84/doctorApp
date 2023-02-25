import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFonts} from 'expo-font'

import AppLoading from  'expo-app-loading'
import Singup from './screens/SignUp';
import HomeScreen from './screens/Home';
import DoctorScreen from './screens/Doctors';

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={
      isReady :false
    }
  }
  
  render() {
    const [loaded] = useFonts({
      NotoFont: require('./assets/fonts/NotoKufiArabic-Regular.ttf')
    })
    if(!loaded){
      return null
    }
    
    
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle:{
              backgroundColor:'#007bff'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
              
              fontFamily:'NotoFont'
            }
          }}
        >
          
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='Doctors'
            component={DoctorScreen}
            options={{title:'الأطباء'}}
            />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
