import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFont} from 'expo-font'
import Singup from './screens/SignUp';
import HomeScreen from './screens/Home';
import DoctorScreen from './screens/Doctors';

export default class App extends React.Component {
  
  render() {
    // const [loaded] = useFont({
    //   NotoFont: require('./assets/fonts/NotoKufiArabic-Regular.ttf')
    // })
    // if(!loaded){
    //   return null
    // }
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
              textAlign:'right',
              //fontFamily:'NotoFont'
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
          {/* <Slack.Screen
          name="SignUp"
          Component={Singup}
          options={
           { 
            title:'حساب جديد'
           }
          }
          
          /> */}
          
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
